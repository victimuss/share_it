from fastapi import APIRouter, HTTPException, Query
from loguru import logger
import uuid
from core.redis_config import redis_client
from core.logging import logger
from core.config import settings
from databases.users_db.users_db import User
from sqlalchemy import select
from databases.main_databases import async_session, get_db
from fastapi import Depends
from utils import crypto
from sqlalchemy.ext.asyncio import AsyncSession
from auth.jwt_tokens import create_access_token
from pydantic import BaseModel

router = APIRouter(prefix="/auth")
redis = redis_client
NONCE_EXPIRE = settings.NONCE_EXPIRE
@logger.catch
@router.post("/request_challenge")
async def request_challenge(
    user_id: int = Query(None),
    public_key: str = Query(None),
    db: AsyncSession = Depends(get_db)
):
    auth_logger = logger
    nonce = str(uuid.uuid4())

    #  ЛОГИН (Уже есть в БД)
    if user_id:
        # Ищем только поле public_key, чтобы не тянуть весь объект юзера
        result = await db.execute(select(User.public_key).where(User.id == user_id))
        stored_pubkey = result.scalar_one_or_none()

        if not stored_pubkey:
            auth_logger.warning(f"Login attempt for non-existent ID: {user_id}")
            raise HTTPException(status_code=404, detail="Пользователь не найден или не настроен ключ")

        redis_key = f"auth:nonce:id:{user_id}"
        await redis.setex(redis_key, 60, nonce)
        
        auth_logger.info(f"Challenge (login) for ID {user_id} generated")
        return {"nonce": nonce, "user_id": user_id}

    # РЕГИСТРАЦИЯ (Новый юзер)
    elif public_key:
        # Проверяем, не занят ли уже такой ключ (важно для уникальности)
        result = await db.execute(select(User.id).where(User.public_key == public_key))
        existing_id = result.scalar_one_or_none()
        
        if existing_id:
            auth_logger.error(f"Registration attempt with existing PK: {public_key[:15]}...")
            raise HTTPException(status_code=400, detail="Этот ключ уже зарегистрирован")

        redis_key = f"auth:nonce:pk:{public_key}"
        await redis.setex(redis_key, 60, nonce)
        
        auth_logger.info(f"Challenge (reg) for new PK generated")
        return {"nonce": nonce}

    raise HTTPException(status_code=400, detail="Нужен user_id или public_key")

class VerifyRequest(BaseModel):
    user_id: int | None = None
    public_key: str | None = None
    nonce: str
    signature: str

@router.post("/verify_challenge")
async def verify_challenge(
    data: VerifyRequest,
    db: AsyncSession = Depends(get_db)
):
    redis_key = f"auth:nonce:id:{data.user_id}" if data.user_id else f"auth:nonce:pk:{data.public_key}"
    stored_nonce = await redis.get(redis_key)

    if not stored_nonce or stored_nonce != data.nonce:
        raise HTTPException(status_code=400, detail="Nonce не найден или протух")


    current_public_key = data.public_key
    if not current_public_key:
        raise HTTPException(status_code=400, detail="Public key is missing")

    if data.user_id:
        result = await db.execute(select(User.public_key).where(User.id == data.user_id))
        current_public_key = result.scalar_one_or_none()
        if not current_public_key:
            raise HTTPException(status_code=404, detail="User not found")


    is_valid = crypto.verify_signature(current_public_key, data.nonce, data.signature)
    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid signature")

 
    target_user_id = data.user_id
    if not target_user_id:
        existing = await db.execute(select(User.id).where(User.public_key == data.public_key))
        if existing.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="This PK is already registered")

        new_user = User(
            public_key=data.public_key,
            user_name=f"pilot-{data.public_key[:6]}",
            email=f"pilot-{data.public_key[:6]}@pilot.com",
            tag=f"@{uuid.uuid4().hex[:6]}",
            hashed_password=""
        )
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        target_user_id = new_user.id
        logger.info(f"New user {target_user_id} registered")


    await redis.delete(redis_key)

    token_data = {"sub": str(target_user_id)}
    return {
        "access_token": create_access_token(data=token_data),
        "token_type": "bearer",
        "user_id": target_user_id
    }
    
from fastapi import APIRouter, HTTPException, Query
from loguru import logger
import uuid
from core.redis_config import redis_client
from core.logging import logger
from core.config import settings
from databases.users_db.users_db import User, UserLesson
from databases.lesson_db.lesson_db import Lesson
from sqlalchemy import select, func
from databases.main_databases import async_session, get_db
from fastapi import Depends
from utils import crypto
from sqlalchemy.ext.asyncio import AsyncSession
from auth.jwt_tokens import create_access_token
from pydantic import BaseModel
from auth.dependency import get_current_user

router = APIRouter(prefix="/auth")
redis = redis_client
NONCE_EXPIRE = settings.NONCE_EXPIRE
@logger.catch
@router.post("/request_challenge")
async def request_challenge(
    public_key: str = Query(...),
    db: AsyncSession = Depends(get_db)
):
    if not public_key:
        raise HTTPException(status_code=400, detail="Нужен public_key")

    nonce = str(uuid.uuid4())
    redis_key = f"auth:nonce:pk:{public_key}"
    await redis.setex(redis_key, 60, nonce)
    logger.info(f"Challenge generated for PK: {public_key[:15]}...")
    return {"nonce": nonce}


class VerifyRequest(BaseModel):
    public_key: str
    nonce: str
    signature: str


@router.post("/verify_challenge")
async def verify_challenge(
    data: VerifyRequest,
    db: AsyncSession = Depends(get_db)
):
    redis_key = f"auth:nonce:pk:{data.public_key}"
    stored_nonce = await redis.get(redis_key)

    if not stored_nonce or stored_nonce != data.nonce:
        raise HTTPException(status_code=400, detail="Nonce не найден или протух")

    is_valid = crypto.verify_signature(data.public_key, data.nonce, data.signature)
    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid signature")

    result = await db.execute(select(User).where(User.public_key == data.public_key))
    current_user = result.scalar_one_or_none()

    if not current_user:
        # Создаем нового пользователя
        current_user = User(
            public_key=data.public_key,
            user_name=f"pilot-{data.public_key[2:8]}",
            email=f"pilot-{data.public_key[2:8]}@pilot.com",
            tag=f"@{uuid.uuid4().hex[:6]}",
            hashed_password=""
        )
        db.add(current_user)
        await db.commit()
        await db.refresh(current_user)
        logger.info(f"New user {current_user.id} registered via ZKP")
    else:
        logger.info(f"User {current_user.id} logged in via ZKP")

    await redis.delete(redis_key)

    us_likes = await db.execute(
        select(func.sum(Lesson.likes)).where(Lesson.author_id == current_user.id))
    us_lessons = await db.execute(
        select(func.count(Lesson.id)).where(Lesson.author_id == current_user.id))
    us_learn_lessons = await db.execute(
        select(func.count(UserLesson.id)).where(UserLesson.user_id == current_user.id))

    token_data = {"sub": str(current_user.id)}
    return {
        "access_token": create_access_token(data=token_data),
        "token_type": "bearer",
        "user_id": current_user.id,
        "user": {
            "user_name": current_user.user_name,
            "tag": current_user.tag,
            "avatar": current_user.avatar,
            "telegram": current_user.telegram,
            "site": current_user.site
        },
        "us_likes": us_likes.scalar() or 0,
        "us_lessons": us_lessons.scalar() or 0,
        "us_learn_lessons": us_learn_lessons.scalar() or 0
    }

@router.post("/telegram")
async def telegram(user_id = Depends(get_current_user)):
    short_code = str(uuid.uuid4())[:8]
    await redis.setex(f"telegram:{short_code}", 60, str(user_id))
    bot_username = "assist_me_please_P_bot"
    logger.info(f"Telegram link generated for user {user_id}: https://t.me/{bot_username}?start={short_code}")
    return {"tg_url": f"https://t.me/{bot_username}?start={short_code}"}
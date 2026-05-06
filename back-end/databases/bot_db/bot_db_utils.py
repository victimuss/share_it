from databases.users_db.users_db import User
from databases.main_databases import async_session
from sqlalchemy import *
from fastapi import HTTPException, status
from typing import Optional
from databases.bot_db.bot_db import UserNotifications
from sqlalchemy.orm import joinedload
import asyncio
from core.config import settings
import json
from core.logging import logger

async def register_new_user(user_id: int, chat_id: int):
    async with async_session() as session:
        res = await session.execute(
            select(UserNotifications).where(
                UserNotifications.user_id == user_id,
                UserNotifications.category == "general"
            )
        )
        user = res.scalar_one_or_none()
        
        if user:
            return {"status": "error", "message": "Пользователь уже зарегистрирован"}
        try:
            new_user = UserNotifications(
                user_id=user_id,
                chat_id=chat_id,
                category="general"   
            )
            session.add(new_user)
            await session.commit()
            return {"status": "ok"}
        except Exception as e:
            logger.error(f"Error registering new user: {e}")
            return {"status": "error", "message": "Ошибка регистрации"}

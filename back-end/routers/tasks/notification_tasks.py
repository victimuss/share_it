from celery import Celery
import os
import asyncio
from core.config import settings
from core.s3_client import s3_storage
from databases.main_databases import async_session
from sqlalchemy import update
from uuid import uuid4
import aiogram.exceptions
from core.logging import logger
from databases.lesson_db.lesson_db import LessonSheet
from celery import shared_task
from core.celery_app import celery_app
from databases.bot_db.bot_db import UserNotifications
from databases.users_db.users_db import User
from sqlalchemy import select
from aiogram import Bot

from core.config import settings

def _run_async_dispatch(user_id: int, message_text: str, category: str):
    asyncio.run(_async_dispatch_logic(user_id, message_text, category))
        
            
async def _async_dispatch_logic(user_id: int, message_text: str, category: str):
    async with async_session() as session:
        if category == "general":
            stmt = select(UserNotifications.chat_id).where(UserNotifications.user_id == user_id)
            chat_id = await session.scalar(stmt)
            
            if chat_id:
                send_single_tg_message.delay(chat_id, message_text)
            else:
                logger.warning(f"User {user_id} has no tg chat_id.")
                
        else:
            stmt = select(UserNotifications.chat_id).where(UserNotifications.category == category)
            user_chats = await session.scalars(stmt)
            chat_ids = user_chats.all()
            
            if not chat_ids:
                logger.info(f"No users subscribed to category: {category}")
                return
                
            for chat_id in chat_ids:
                send_single_tg_message.delay(chat_id, message_text)

@celery_app.task(name="dispatch_notifications")
def dispatch_notifications(user_id: int, message_text: str, category: str = "general"):
    _run_async_dispatch(user_id, message_text, category)

@celery_app.task(bind=True, name="send_single_tg_message", rate_limit="30/m", max_retries=5)
def send_single_tg_message(self, chat_id: int, message_text: str):
    try:
        _run_async_send(chat_id, message_text)
    except aiogram.exceptions.TelegramRetryAfter as e:
        logger.warning(f"Rate limit for chat {chat_id}. Sleeping {e.retry_after}s.")
        raise self.retry(exc=e, countdown=e.retry_after)
    except Exception as e:
        logger.error(f"Failed to send message to chat_id {chat_id}: {e}")
        delay = 2 ** self.request.retries
        raise self.retry(exc=e, countdown=delay)

async def _safe_send_message(chat_id: int, message_text: str):
    bot = Bot(token=settings.BOT_TOKEN)
    try:
        await bot.send_message(chat_id, message_text)
    except Exception as e:
        logger.error(f"Failed to send message to chat_id {chat_id}: {e}")
        raise e
    finally:
        await bot.session.close()
    
def _run_async_send(chat_id: int, message_text: str):
    asyncio.run(_safe_send_message(chat_id, message_text))
    
  
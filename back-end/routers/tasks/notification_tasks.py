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
from typing import Optional
from aiogram.types import InlineKeyboardMarkup
from aiogram import Bot
from telegram_bot.keyboards.inline_keyboards import get_lesson_kb

from core.config import settings

def _run_async_dispatch(user_id: int, message_text: str, category: str, url: Optional[str] = None):
    asyncio.run(_async_dispatch_logic(user_id, message_text, category, url))
        
@logger.catch            
async def _async_dispatch_logic(user_id: int, message_text: str, category: str, url: Optional[str] = None):
    async with async_session() as session:
        if category == "general":
            stmt = select(UserNotifications.chat_id).where(UserNotifications.user_id == user_id)
            chat_id = await session.scalar(stmt)
            
            if chat_id:
                send_single_tg_message.delay(chat_id, message_text, url)
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
                send_single_tg_message.delay(chat_id, message_text, url)

@celery_app.task(name="dispatch_notifications")
@logger.catch
def dispatch_notifications(user_id: int, message_text: str, category: str = "general", url: Optional[str] = None):
    _run_async_dispatch(user_id, message_text, category, url)

@celery_app.task(bind=True, name="send_single_tg_message", rate_limit="30/m", max_retries=5)
@logger.catch
def send_single_tg_message(self, chat_id: int, message_text: str, url: Optional[str] = None):
    try:
        _run_async_send(chat_id, message_text, url)
    except aiogram.exceptions.TelegramRetryAfter as e:
        logger.warning(f"Rate limit for chat {chat_id}. Sleeping {e.retry_after}s.")
        raise self.retry(exc=e, countdown=e.retry_after)
    except Exception as e:
        logger.error(f"Failed to send message to chat_id {chat_id}: {e}")
        delay = 2 ** self.request.retries
        raise self.retry(exc=e, countdown=delay)

@logger.catch  
async def _safe_send_message(chat_id: int, message_text: str, url: Optional[str] = None):
    bot = Bot(token=settings.BOT_TOKEN)
    kb = get_lesson_kb(url) if url else None
    try:
        await bot.send_message(chat_id, message_text, reply_markup=kb)
    except Exception as e:
        logger.error(f"Failed to send message to chat_id {chat_id}: {e}")
        raise e
    finally:
        await bot.session.close()
    
@logger.catch
def _run_async_send(chat_id: int, message_text: str, url: Optional[str] = None):
    asyncio.run(_safe_send_message(chat_id, message_text, url))
    
  
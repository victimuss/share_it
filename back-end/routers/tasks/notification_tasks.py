import asyncio
from typing import Optional, List, Dict, Any
from enum import Enum

from celery import shared_task
from aiogram import Bot
from aiogram.types import InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder
import aiogram.exceptions

from core.config import settings
from core.celery_app import celery_app
from core.logging import logger
from databases.main_databases import async_session
from sqlalchemy import select

from databases.bot_db.bot_db import UserNotifications
from databases.lesson_db.lesson_db import Lesson
from telegram_bot.keyboards.inline_keyboards import get_lesson_kb, get_last_lessons

class LessonStatus(str, Enum):
    ACTIVE = "ACTIVE"

class NotificationCategory(str, Enum):
    GENERAL = "general"

bot = Bot(token=settings.BOT_TOKEN)

def run_async(coro):
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    return loop.run_until_complete(coro)

@celery_app.task(name="start_mass_mailing")
def start_mass_mailing():
    run_async(_async_start_mass_mailing())

async def _async_start_mass_mailing():
    async with async_session() as session:
        stmt = select(UserNotifications.category).distinct()
        categories = (await session.scalars(stmt)).all()
        
        for cat in categories:
            dispatch_notifications.delay(category=cat)

@celery_app.task(name="dispatch_notifications")
def dispatch_notifications(user_id: Optional[int] = None, category: str = "general"):
    run_async(_async_dispatch_logic(user_id, category))

async def _async_dispatch_logic(user_id: Optional[int], category: str):
    async with async_session() as session:
        stmt_lessons = select(Lesson).where(
            Lesson.status == LessonStatus.ACTIVE,
            Lesson.type == category
        ).order_by(Lesson.created_at.desc()).limit(5)
        
        lessons = (await session.scalars(stmt_lessons)).all()
        if not lessons and not user_id:
            return

        lesson_data = [{"id": l.id, "title": l.title} for l in lessons]
        message_text = f"Свежие лекции в категории {category}!"

        if user_id:
            stmt_users = select(UserNotifications.chat_id).where(UserNotifications.user_id == user_id)
        else:
            stmt_users = select(UserNotifications.chat_id).where(UserNotifications.category == category)
        
        chat_ids = (await session.scalars(stmt_users)).all()

        for chat_id in chat_ids:
            send_single_tg_message.apply_async(
                args=[chat_id, message_text],
                kwargs={'lesson_data': lesson_data},
                countdown=0.1 
            )

@celery_app.task(
    bind=True, 
    name="send_single_tg_message", 
    rate_limit="30/m", 
    max_retries=10,
    autoretry_for=(aiogram.exceptions.TelegramRetryAfter, Exception),
    retry_backoff=True,
    retry_jitter=True
)
def send_single_tg_message(self, chat_id: int, message_text: str, lesson_data: Optional[List[Dict]] = None):
    run_async(_safe_send_message(chat_id, message_text, lesson_data))

async def _safe_send_message(chat_id: int, message_text: str, lesson_data: Optional[List[Dict]] = None):
    kb = None
    if lesson_data:
        kb = get_last_lessons(lesson_data) 

    try:
        await bot.send_message(chat_id, message_text, reply_markup=kb)
    except aiogram.exceptions.TelegramForbiddenError:
        logger.warning(f"User {chat_id} blocked the bot.")
    except aiogram.exceptions.TelegramRetryAfter as e:
        raise e
    except Exception as e:
        logger.error(f"Failed to send message to {chat_id}: {e}")
        raise e

from celery.schedules import crontab

celery_app.conf.beat_schedule = {
    'mass-mailing-every-3-days': {
        'task': 'start_mass_mailing',
        'schedule': crontab(hour=10, minute=0, day_of_month='*/3'),
    },
}
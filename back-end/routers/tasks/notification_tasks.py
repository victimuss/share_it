import asyncio
from typing import Optional, List
from celery import shared_task
from aiogram import Bot
import aiogram.exceptions

from core.config import settings
from core.celery_app import celery_app
from core.logging import logger
from databases.main_databases import async_session
from sqlalchemy import select

from databases.bot_db.bot_db import UserNotifications
from databases.users_db.users_db import User
from databases.lesson_db.lesson_db import Lesson
from telegram_bot.keyboards.inline_keyboards import get_lesson_kb, get_last_lessons
from celery.schedules import crontab
from datetime import timedelta


tg_bot = Bot(token=settings.BOT_TOKEN)

@celery_app.task(name="dispatch_notifications")
@logger.catch
def dispatch_notifications(user_id: int, message_text: str, category: str = "general", url: Optional[str] = None):
    asyncio.run(_async_dispatch_logic(user_id, message_text, category, url))

async def _async_dispatch_logic(user_id: int, message_text: str, category: str, url: Optional[str] = None):
    async with async_session() as session:
        if user_id is not None:
            stmt = select(UserNotifications.chat_id).where(UserNotifications.user_id == user_id)
            chat_id = await session.scalar(stmt)
            
            if chat_id:
                send_single_tg_message.delay(chat_id, message_text, url)
            else:
                logger.warning(f"User {user_id} has no tg chat_id.")
                
        else:
            stmt = select(UserNotifications.chat_id).where(UserNotifications.category == category)
            chat_ids = (await session.scalars(stmt)).all()
            
            if not chat_ids:
                logger.info(f"No users subscribed to category: {category}")
                return
                
            stmt = select(Lesson.id).where(
                Lesson.status == "ACTIVE", 
                Lesson.type == category
            ).order_by(Lesson.created_at.desc()).limit(5)
            
            lesson_ids = list(await session.scalars(stmt))
            if not lesson_ids:
                logger.info(f"No lessons found for category: {category}")
                return
            
            for chat_id in chat_ids:
                send_single_tg_message.delay(chat_id, message_text, url, lesson_ids)


@celery_app.task(bind=True, name="send_single_tg_message", rate_limit="30/m", max_retries=5)
@logger.catch
def send_single_tg_message(self, chat_id: int, message_text: str, url: Optional[str] = None, lesson_ids: Optional[List[int]] = None):
    try:
        asyncio.run(_safe_send_message(chat_id, message_text, url, lesson_ids))
    except aiogram.exceptions.TelegramRetryAfter as e:
        logger.warning(f"Rate limit for chat {chat_id}. Sleeping {e.retry_after}s.")
        raise self.retry(exc=e, countdown=e.retry_after)
    except Exception as e:
        logger.error(f"Failed to send message to chat_id {chat_id}: {e}")
        delay = 2 ** self.request.retries
        raise self.retry(exc=e, countdown=delay)


async def _safe_send_message(chat_id: int, message_text: str, url: Optional[str] = None, lesson_ids: Optional[List[int]] = None):
    kb = None
    if lesson_ids:
        async with async_session() as session:
            stmt = select(Lesson).where(Lesson.id.in_(lesson_ids))
            lessons = list(await session.scalars(stmt))
            kb = get_last_lessons(lessons)
    elif url:
        kb = get_lesson_kb(url)

    try:
        await tg_bot.send_message(chat_id, message_text, reply_markup=kb)
    except Exception as e:
        logger.error(f"Failed to send message to chat_id {chat_id}: {e}")
        raise e
@celery_app.task(name="start_mass_mailing")
def start_mass_mailing():
    asyncio.run(_async_mass_mailing_logic())

@logger.catch
async def _async_mass_mailing_logic():
    async with async_session() as session:
        stmt = select(UserNotifications.category).distinct()
        categories = (await session.scalars(stmt)).all()
        
        for cat in categories:
            dispatch_notifications.delay(
                user_id=None,
                message_text=f"Свежие лекции в категории {cat} за последние 3 дня!",
                category=cat
            )

from celery.schedules import crontab

celery_app.conf.beat_schedule = {
    'mass-mailing-calendar': {
        'task': 'start_mass_mailing',
        'schedule': crontab(hour=10, minute=0, day_of_month='*/3'),
    },
}
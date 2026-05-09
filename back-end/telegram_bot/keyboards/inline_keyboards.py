from aiogram.utils.keyboard import InlineKeyboardBuilder, InlineKeyboardMarkup
from databases.lesson_db.lesson_db import Lesson
from typing import List
from databases.main_databases import async_session
from databases.bot_db.bot_db import UserNotifications
from databases.lesson_db.lesson_db import select
from aiogram.filters.callback_data import CallbackData




CATEGORY_NAMES = ['code', 'language', 'business', 'design']
def get_lesson_kb(url: str) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    # Telegram удаляет кнопки с локальными IP (127.0.0.1). 
    # Временно ставим Google для тестов, пока вы не поднимете сервер на белом IP.
    safe_url = url if not ("127.0.0.1" in url or "localhost" in url) else "https://google.com"
    builder.button(text="Перейти к уроку", url=safe_url)
    return builder.as_markup()

def get_last_lessons(lessons: List[Lesson]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for lesson in lessons:
        builder.button(text=lesson.lesson_name, url=lesson.url)
    builder.adjust(1)
    return builder.as_markup()

class CategoryCallback(CallbackData, prefix="cat"):
    action: str
    category_name: str

async def get_category_kb(chat_id: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    async with async_session() as session:
        user_categories = await session.execute(
            select(UserNotifications)
            .where(UserNotifications.chat_id == chat_id)
        )
    user_categories = user_categories.scalars().all()

    for row in user_categories:
        cat_name = row.category 
        if cat_name not in CATEGORY_NAMES:
            continue
        builder.button(
            text=f'❌ {cat_name}',
            callback_data=CategoryCallback(
                action='unsubscribe', 
                category_name=cat_name
            ).pack()
        )
        
    builder.adjust(2)
    return builder.as_markup()

async def get_all_category_kb() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for cat_name in CATEGORY_NAMES:
        builder.button(
            text=f'✅ {cat_name}',
            callback_data=CategoryCallback(
                action='subscribe', 
                category_name=cat_name
            ).pack()
        )
    builder.adjust(2)
    return builder.as_markup()
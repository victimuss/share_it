from aiogram.utils.keyboard import InlineKeyboardBuilder, InlineKeyboardMarkup
from databases.lesson_db.lesson_db import Lesson
from typing import List

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
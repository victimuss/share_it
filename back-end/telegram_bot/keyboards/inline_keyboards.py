from aiogram.utils.keyboard import InlineKeyboardBuilder

def get_lesson_kb(url: str):
    builder = InlineKeyboardBuilder()
    builder.button(text="Перейти к уроку", url=url)
    return builder.as_markup()
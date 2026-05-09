from aiogram.utils.keyboard import ReplyKeyboardBuilder
from aiogram.types import KeyboardButton

def get_main_menu_kb():
    builder = ReplyKeyboardBuilder()
    
    builder.add(KeyboardButton(text="Добавить категорию"))
    builder.add(KeyboardButton(text="Мои категории"))
    builder.add(KeyboardButton(text="Сменить язык")) # for future update
    builder.add(KeyboardButton(text="Поддержка"))
    
    builder.adjust(2)
    
    return builder.as_markup(
        resize_keyboard=True,           
        input_field_placeholder="Выберите раздел...",
        one_time_keyboard=False
    )
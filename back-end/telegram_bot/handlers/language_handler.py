from aiogram import F, Router
from aiogram.types import Message
from telegram_bot.keyboards.reply_keyboards import get_main_menu_kb
from core.logging import logger


router = Router()
@logger.catch
@router.message(F.text == "Сменить язык")
async def show_my_courses(message: Message):
    await message.answer('Ожидайте в ближайшем обновлении!')
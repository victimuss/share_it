from aiogram import F, Router
from aiogram.types import Message
from core.logging import logger

router = Router()
@logger.catch
@router.message(F.text == "Поддержка")
async def show_my_courses(message: Message):
    await message.answer("Обратитесь в поддержку по ссылке: https://t.me/spark_app_edu")
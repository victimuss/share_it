from aiogram import Router, types
from aiogram.filters import CommandStart
from telegram_bot.services.zkp_logic import ZKPService
from core.redis_config import redis_client as redis
from databases.main_databases import async_session
from aiogram.filters import Command, CommandObject
from databases.users_db.users_db import User
from sqlalchemy import insert
from databases.bot_db.bot_db_utils import register_new_user
from core.logging import logger
from fastapi import HTTPException
from telegram_bot.keyboards.reply_keyboards import get_main_menu_kb

router = Router()
@logger.catch
@router.message(CommandStart())
async def start_command(message: types.Message, command: CommandStart):
    token = await redis.get(f"telegram:{command.args}")
    logger.info(token)
    logger.info(command.args)
    if not token:
        await message.answer(
            "👋 Привет! Чтобы привязать уведомления, "
            "перейди на главный экран в приложении и нажми на колокольчик.", reply_markup=get_main_menu_kb()
        )
        return
    try:
        user_id = int(token)
        result = await register_new_user(user_id, message.chat.id)
        if result['status'] == 'ok':
            await message.answer("✅ **Spark подключен!**\nТеперь ты будешь получать уведомления о модерации и новых уроках прямо здесь.", reply_markup=get_main_menu_kb())
        else:
            await message.answer(f"❌ Ошибка: {result['message']}", reply_markup=get_main_menu_kb())
    except HTTPException as e:
        await message.answer(f"❌ Ошибка: {e.detail}", reply_markup=get_main_menu_kb())
    except Exception as e:
        await message.answer(f"❌ Не удалось привязать аккаунт. Попробуй еще раз. Ошибка: {str(e)}", reply_markup=get_main_menu_kb())



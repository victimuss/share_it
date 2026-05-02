from aiogram import Router, types
from aiogram.filters import CommandStart
from telegram_bot.services.zkp_logic import ZKPService

from databases.main_databases import async_session
from databases.users_db.users_db import User
from sqlalchemy import insert

router = Router()

@router.message(CommandStart())
async def start_command(message: types.Message):
    mnemonic, v = ZKPService.generate_user_secrets()
    
    # async with async_session() as session:
    #     stmt = insert(User).values(public_v=v).returning(User.id)
    #     result = await session.execute(stmt)
    #     user_id = result.scalar()
    #     await session.commit()
    user_id = 0
    responce = (
        "<b>Ваш анонимный аккаунт Spark Edu создан!</b> 🎓\n\n"
        f"🆔 Ваш ID: <code>{user_id}</code>\n"
        f"🗝 <b>Ваша сид-фраза (12 слов):</b>\n\n"
        f"<code>{mnemonic}</code>\n\n"
        "⚠️ <b>ВНИМАНИЕ:</b> Скопируйте и сохраните эту фразу. "
        "Мы не храним её и не сможем восстановить ваш доступ. "
        "Ваш Telegram ID нам также неизвестен — вы полностью анонимны."
    )

    await message.answer(responce, parse_mode='HTML')


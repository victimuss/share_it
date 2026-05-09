from aiogram import F, Router
from aiogram.types import Message, CallbackQuery
from telegram_bot.keyboards.reply_keyboards import get_main_menu_kb
from core.logging import logger
from telegram_bot.keyboards.inline_keyboards import get_category_kb, get_all_category_kb
from aiogram.filters.callback_data import CallbackData
from databases.main_databases import async_session
from databases.bot_db.bot_db import UserNotifications
from sqlalchemy import delete, insert, select
from databases.users_db.users_db import User





router = Router()

class CategoryCallback(CallbackData, prefix="cat"):
    action: str
    category_name: str

@logger.catch
@router.message(F.text == "Мои категории")
async def show_my_courses(message: Message):
    kb = await get_category_kb(chat_id=message.chat.id)
    await message.answer("Категории, на которые вы подписаны: \n Нажмите, чтобы отписаться", reply_markup=kb)

@logger.catch
@router.message(F.text == "Добавить категорию")
async def show_all_courses(message: Message):
    kb = await get_all_category_kb()
    await message.answer("Все категории:\n Нажмите, чтобы подписаться", reply_markup=kb)

@router.callback_query(CategoryCallback.filter(F.action == 'unsubscribe'))
async def handle_unsubscribe(callback: CallbackQuery, callback_data: CategoryCallback):
    category_to_remove = callback_data.category_name
    chat_id = callback.message.chat.id
    async with async_session() as session:
        stmt = delete(UserNotifications).where(
            UserNotifications.chat_id == chat_id,
            UserNotifications.category == category_to_remove
        )
        await session.execute(stmt)
        await session.commit()
    await callback.answer(f"Вы отписались от {category_to_remove}")
    new_kb = await get_category_kb(chat_id=callback.message.chat.id)
    try:
        await callback.message.edit_text(
            text="Ваши подписки обновлены:",
            reply_markup=new_kb
        )
    except Exception:
        pass


@router.callback_query(CategoryCallback.filter(F.action == 'subscribe'))
async def handle_subscribe(callback: CallbackQuery, callback_data: CategoryCallback):
    category_to_add = callback_data.category_name
    chat_id = callback.message.chat.id
    async with async_session() as session:
        user_id = await session.execute(select(UserNotifications.user_id).where(UserNotifications.chat_id == chat_id))
        user_id = user_id.scalar()
        stmt = insert(UserNotifications).values(
            chat_id = chat_id,
            category = category_to_add,
            user_id = user_id
        )
        await session.execute(stmt)
        await session.commit()
    await callback.answer(f"Вы подписались на {category_to_add}")
    new_kb = await get_all_category_kb()
    try:
        await callback.message.edit_text(
            text="Все категории:\n Нажмите, чтобы подписаться",
            reply_markup=new_kb
        )
    except Exception:
        pass
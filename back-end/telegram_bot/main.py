import asyncio
import logging
from aiogram import Bot, Dispatcher
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from core.config import settings
from telegram_bot.handlers import start
from telegram_bot.handlers import caterory_handles
from telegram_bot.handlers import language_handler
from telegram_bot.handlers import support_handler


async def main():
    logging.basicConfig(level=logging.INFO)
    from dotenv import load_dotenv
    load_dotenv()
    bot = Bot(token=str(os.getenv('BOT_TOKEN')))
    dp = Dispatcher()

    import databases.users_db.users_db
    import databases.lesson_db.lesson_db
    import databases.bot_db.bot_db

    dp.include_router(start.router)
    dp.include_router(caterory_handles.router)
    dp.include_router(language_handler.router)
    dp.include_router(support_handler.router)

    logging.info("Бот для уведомлений запущен...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
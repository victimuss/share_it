import asyncio
import logging
from aiogram import Bot, Dispatcher
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from core.config import settings
from telegram_bot.handlers import start

async def main():
    logging.basicConfig(level=logging.INFO)
    from dotenv import load_dotenv
    load_dotenv()
    bot = Bot(token=str(os.getenv('BOT_TOKEN')))
    dp = Dispatcher()

    dp.include_router(start.router)

    logging.info("Бот для анонимной регистрации запущен...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
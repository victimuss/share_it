import asyncio
import uvicorn
from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
engine = create_async_engine(url='sqlite+aiosqlite:///db.sqlite3')
async_session = async_sessionmaker(engine)
def initialize_models():
    """
    ЕДИНСТВЕННОЕ место, где импортируются ВСЕ модели.
    Это гарантирует, что Base.metadata знает о всех таблицах.
    """
    print("Инициализация моделей...")
    
    from databases.databases_compile import Base  # ← Base
    
    # Импортируем все модели
    from databases.users_db.users_db import User, UserLesson
    from databases.lesson_db.lesson_db import Lesson, LessonSheet, LessonRank, LessonLike, RegistedUsers, LessonTag
    
    print("Все модели загружены!")
    print(f"Таблицы, зарегистрированные в Base: {list(Base.metadata.tables.keys())}")
    
async def create_all_tables():
    """Создаем все таблицы в базе данных"""
    print("Создаем таблицы в базе данных...")
    
    from databases.databases_compile import Base
    
    # Гарантируем, что все модели загружены
    initialize_models()
    
    async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    print("Все таблицы созданы успешно!")


async def get_db():
    async with async_session() as session:
        yield session
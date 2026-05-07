import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config
import sys
from os.path import dirname, abspath
from core.config import settings
from databases.databases_compile import Base
from databases.users_db.users_db import User, UserLesson
from databases.lesson_db.lesson_db import Lesson, LessonSheet, LessonRank, LessonLike, RegistedUsers, LessonTag
from databases.bot_db.bot_db import UserNotifications

sys.path.insert(0, dirname(dirname(abspath(__file__))))

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata =Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


async def run_async_migrations() -> None:
    """Создание движка и запуск миграций в асинхронном режиме."""
    
    # 1. Получаем секцию настроек из alembic.ini
    config_section = config.get_section(config.config_ini_section, {})
    
    # 2. ВРУЧНУЮ подставляем URL из твоего pydantic-конфига
    # Ключ должен быть именно "sqlalchemy.url", так как ниже prefix="sqlalchemy."
    config_section["sqlalchemy.url"] = settings.DATABASE_URL

    # 3. Передаем модифицированный словарь в конструктор движка
    connectable = async_engine_from_config(
        config_section,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    context.configure(
        url=str(settings.DATABASE_URL),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""

    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

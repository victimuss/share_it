
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import AsyncAttrs

class Base(AsyncAttrs, DeclarativeBase):
    pass

# Ensure all models are loaded so SQLAlchemy can resolve string relationships
import databases.users_db.users_db
import databases.lesson_db.lesson_db
import databases.bot_db.bot_db
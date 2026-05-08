from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, column_property
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from typing import List
from sqlalchemy import (
    BigInteger,
    String,
    ForeignKey,
    Numeric,
    Integer,
    DateTime,
    Float,
    Boolean,
    select,
    func,
    JSON,
)
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime, timezone
from databases.databases_compile import Base
from sqlalchemy import UniqueConstraint

def get_utcnow():
    return datetime.now(timezone.utc).replace(tzinfo=None)


class UserNotifications(Base, AsyncAttrs):
    __tablename__ = "user_notifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    chat_id: Mapped[int] = mapped_column(BigInteger, index=True)
    category: Mapped[str] = mapped_column(String, nullable=False, index=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=get_utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=get_utcnow, onupdate=get_utcnow
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    user: Mapped["User"] = relationship(back_populates="user_notifications")

    __table_args__ = (
        UniqueConstraint("user_id", "category", name="uq_user_category"),
    )
    


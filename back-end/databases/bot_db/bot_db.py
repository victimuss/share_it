from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy import (
    BigInteger,
    String,
    ForeignKey,
    Integer,
    DateTime,
    Boolean,
    func,
    UniqueConstraint
)
from datetime import datetime
from databases.databases_compile import Base

class UserNotifications(Base, AsyncAttrs):
    __tablename__ = "user_notifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    chat_id: Mapped[int] = mapped_column(BigInteger, index=True)
    category: Mapped[str] = mapped_column(String, nullable=False, index=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    user: Mapped["User"] = relationship(back_populates="user_notifications")

    __table_args__ = (
        UniqueConstraint("user_id", "category", name="uq_user_category"),
    )
    


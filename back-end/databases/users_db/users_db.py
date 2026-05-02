from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from sqlalchemy import BigInteger, String, ForeignKey, Numeric, Integer, DateTime, Float, Boolean
from sqlalchemy.dialects.postgresql import ARRAY
from typing import List
from datetime import datetime, timezone
from databases.databases_compile import Base
import uuid

def get_utcnow():
    return datetime.now(timezone.utc).replace(tzinfo=None)
    
def generate_unique_tag():
    return f"@{uuid.uuid4().hex[:6]}"

class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key = True)
    user_name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    role: Mapped[str] = mapped_column(String(50), default='user')
    description: Mapped[str] = mapped_column(String(255), default='Нет описания', nullable=True)
    tag: Mapped[str] = mapped_column(String(255),unique=True, nullable=False, default=generate_unique_tag)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar: Mapped[str] = mapped_column(String(255), default='', nullable=True)
    site: Mapped[str] = mapped_column(String(255), default='', nullable=True)
    telegram: Mapped[str] = mapped_column(String(255), default='', nullable=True)
    lessons: Mapped[List["Lesson"]] = relationship(back_populates="author")
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=get_utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=get_utcnow, onupdate=get_utcnow)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    
class UserLesson(Base):
    __tablename__ = 'user_lessons'
    id: Mapped[int] = mapped_column(primary_key = True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    lesson_id: Mapped[int] = mapped_column(Integer, ForeignKey('lessons.id'))
    status: Mapped[str] = mapped_column(String(50), default='IN_PROGRESS')
    completed_steps: Mapped[float] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=get_utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=get_utcnow, onupdate=get_utcnow)
    lesson: Mapped["Lesson"] = relationship(back_populates="users_lesson")

class UsersSkills(Base):
    __tablename__ = 'users_skills'
    id: Mapped[int] = mapped_column(primary_key = True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    skill_name: Mapped[str] = mapped_column(String(255), nullable=False)
    level: Mapped[str] = mapped_column(String(50), default='Beginner')
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=get_utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=get_utcnow, onupdate=get_utcnow)



class UserProgress(Base):
    __tablename__ = 'user_progress'

    id: Mapped[int] = mapped_column(primary_key = True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    slide_id: Mapped[int] = mapped_column(Integer, ForeignKey('lesson_sheets.id'))
    
    selected_answer: Mapped[str] = mapped_column(String(255), nullable=True) 
    
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False) 
    
    answered_at: Mapped[datetime] = mapped_column(DateTime, default=get_utcnow)
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

def get_utcnow():
    return datetime.now(timezone.utc).replace(tzinfo=None)


class Lesson(Base):
    __tablename__ = "lessons"
    id: Mapped[int] = mapped_column(primary_key=True)
    lesson_name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="DRAFT")
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    type: Mapped[str] = mapped_column(String(50), default="Code")
    level: Mapped[str] = mapped_column(String(50), default="Beginner")
    rank: Mapped[float] = mapped_column(Float, default=0.0)
    rank_count: Mapped[int] = mapped_column(Integer, default=0)
    likes: Mapped[int] = mapped_column(Integer, default=0)
    author_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    author: Mapped["User"] = relationship(back_populates="lessons")
    users_lesson: Mapped[List["UserLesson"]] = relationship(
        back_populates="lesson",
        cascade="all, delete-orphan" 
    )
    tags: Mapped[List["LessonTag"]] = relationship(
        back_populates="lesson",
        cascade="all, delete-orphan"
    )
    rating_list: Mapped[List["LessonRank"]] = relationship(
        back_populates="lesson",
        cascade="all, delete-orphan"
    )
    likes_list: Mapped[List["LessonLike"]] = relationship(
        back_populates="lesson",
        cascade="all, delete-orphan"
    )
    sheets: Mapped[List["LessonSheet"]] = relationship(
        back_populates="lesson", 
        cascade="all, delete-orphan",
        order_by="LessonSheet.id.asc()"
    )
    reg_users: Mapped[List["RegistedUsers"]] = relationship(
        back_populates="lesson",
        cascade="all, delete-orphan"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=get_utcnow
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=get_utcnow,
        onupdate=get_utcnow,
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class LessonSheet(Base):
    __tablename__ = "lesson_sheets"
    id: Mapped[int] = mapped_column(primary_key=True)
    author_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    content_id: Mapped[int] = mapped_column(Integer, ForeignKey("lessons.id"))
    sheetType: Mapped[str] = mapped_column(String(50), default="THEORY")
    sheet_header: Mapped[str] = mapped_column(String(50), nullable=False)

    content: Mapped[str] = mapped_column(String(500), nullable=False)

    description_for_video_or_picture: Mapped[str] = mapped_column(String(50), nullable=True)
    video_url: Mapped[str] = mapped_column(String, nullable=True)
    picture_url: Mapped[str] = mapped_column(String, nullable=True)
    image_public_id: Mapped[str] = mapped_column(String, nullable=True)

    question_text: Mapped[str] = mapped_column(String(30), nullable=True)
    quiz_options: Mapped[list] = mapped_column(JSON, nullable=True)

    timeToRead: Mapped[int] = mapped_column(Integer, default=0.0)
    
    content_danger: Mapped[str] = mapped_column(String(75), nullable=True)
    content_advice: Mapped[str] = mapped_column(String(75), nullable=True)

    lesson: Mapped["Lesson"] = relationship(back_populates="sheets")
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=get_utcnow
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=get_utcnow,
        onupdate=get_utcnow,
    )


class LessonLike(Base):
    __tablename__ = "lesson_likes"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    lesson: Mapped["Lesson"] = relationship(back_populates="likes_list")


class RegistedUsers(Base):
    __tablename__ = "registed_users"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    lesson: Mapped["Lesson"] = relationship(back_populates="reg_users")


class LessonRank(Base):
    __tablename__ = "lesson_rank"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    rank: Mapped[float] = mapped_column(Float, default=0.0)
    lesson: Mapped["Lesson"] = relationship(back_populates="rating_list")


class LessonTag(Base):
    __tablename__ = "lesson_tags"

    id: Mapped[int] = mapped_column(primary_key=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    tag: Mapped[str] = mapped_column(String(50), nullable=False)
    lesson: Mapped["Lesson"] = relationship(back_populates="tags")


Lesson.sheet_counts = column_property(
    select(func.count(LessonSheet.id))
    .where(LessonSheet.content_id == Lesson.id)
    .correlate_except(LessonSheet)
    .scalar_subquery()
)

Lesson.students_count = column_property(
    select(func.count(RegistedUsers.id))
    .where(RegistedUsers.lesson_id == Lesson.id)
    .correlate_except(RegistedUsers)
    .scalar_subquery()
)
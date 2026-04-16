from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from sqlalchemy import (
    BigInteger,
    String,
    ForeignKey,
    Numeric,
    Integer,
    DateTime,
    Float,
    Boolean,
)
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime, timezone
from databases.databases_compile import Base


class Lesson(Base):
    __tablename__ = "lessons"
    id: Mapped[int] = mapped_column(primary_key=True)
    lesson_name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="DRAFT")
    description: Mapped[str] = mapped_column(String, nullable=True)
    type: Mapped[str] = mapped_column(String(50), default="Code")
    level: Mapped[str] = mapped_column(String(50), default="Beginner")
    rank: Mapped[float] = mapped_column(Float, default=0.0)
    rank_count: Mapped[int] = mapped_column(Integer, default=0)
    likes: Mapped[int] = mapped_column(Integer, default=0)
    author_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    students_count: Mapped[int] = mapped_column(Integer, default=0)
    sheet_counts: Mapped[int] = column_property(
        select(func.count(LessonSheet.id))
        .where(LessonSheet.content_id == id)
        .correlate_except(LessonSheet)
        .scalar_subquery()
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc),
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class LessonSheet(Base):
    __tablename__ = "lesson_sheets"
    id: Mapped[int] = mapped_column(primary_key=True)
    author_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    content_id: Mapped[int] = mapped_column(Integer, ForeignKey("lessons.id"))
    sheetType: Mapped[str] = mapped_column(String(50), default="THEORY")
    sheet_header: Mapped[str] = mapped_column(String(255), nullable=False)

    content: Mapped[str] = mapped_column(String, nullable=False)

    description_for_video_or_picture: Mapped[str] = mapped_column(String(50), nullable=True)
    video_url: Mapped[str] = mapped_column(String, nullable=True)
    picture_url: Mapped[str] = mapped_column(String, nullable=True)

    question_text: Mapped[str] = mapped_column(String, nullable=True)
    quiz_options: Mapped[list] = mapped_column(JSON, nullable=True)

    timeToRead: Mapped[int] = mapped_column(Integer, default=0.0)
    
    content_danger: Mapped[str] = mapped_column(String, nullable=True)
    content_advice: Mapped[str] = mapped_column(String, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc),
    )


class LessonLike(Base):
    __tablename__ = "lesson_likes"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))


class RegistedUsers(Base):
    __tablename__ = "registed_users"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))


class LessonRank(Base):
    __tablename__ = "lesson_rank"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    rank: Mapped[float] = mapped_column(Float, default=0.0)


class LessonTag(Base):
    __tablename__ = "lesson_tags"

    id: Mapped[int] = mapped_column(primary_key=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    tag: Mapped[str] = mapped_column(String(50), nullable=False)

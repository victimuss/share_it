# src/schemas/lesson.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Схема для создания урока
class LessonCreate(BaseModel):
    lesson_name: str
    description: Optional[str] = None
    type: Optional[str] = "Code"
    level: Optional[str] = "Beginner"
    author_id: int


# Схема для обновления урока
class LessonUpdate(BaseModel):
    sheet_counts: Optional[int] = None
    lesson_name: Optional[str] = None
    description: Optional[str] = None
    level: Optional[str] = None
    is_active: Optional[bool] = None


# Схема для ответа
class LessonOut(BaseModel):
    id: int
    lesson_name: str
    author: Optional[str] = None
    description: Optional[str]
    type: str
    level: str
    rank: float
    sheet_counts: int
    rank_count: int
    author_id: int
    likes: int
    students_count: int
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        orm_mode = True


class SheetCreate(BaseModel):
    sheet_header: str
    content_id: int
    content: str
    author_id: int
    timeToRead: int
    sheetType: str  # (theory, practice, example)
    content_danger: Optional[str]
    content_advice: Optional[str]


class SheetUpdate(BaseModel):
    sheet_header: Optional[str]
    content: Optional[str]
    timeToRead: Optional[int]
    sheetType: Optional[str]
    content_danger: Optional[str]
    content_advice: Optional[str]


# Обновление контента
class LessonContentUpdate(BaseModel):
    content: Optional[str]


# Вывод
class LessonContentOut(BaseModel):
    id: int
    lesson_id: int


class SearchLessonsRequest(BaseModel):
    search: str
    type: Optional[str] = ""
    level: Optional[str] = ""
    page: int
    order: Optional[str] = ""


class SearchLessonsResponse(BaseModel):
    lessons: list[LessonOut]
    total: int

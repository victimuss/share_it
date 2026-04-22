# src/schemas/lesson.py
from pydantic import BaseModel, ConfigDict, field_validator
from typing import Optional, List
from datetime import datetime


# Схема для создания урока
class LessonCreate(BaseModel):
    lesson_name: str
    description: Optional[str] = None
    type: Optional[str] = "Code"
    level: Optional[str] = "Beginner"

class QuizOption(BaseModel):
    option: str
    is_correct: bool

# Схема для обновления урока
class LessonUpdate(BaseModel):
    lesson_name: Optional[str] = None
    description: Optional[str] = None
    level: Optional[str] = None
    status: Optional[str] = None
    is_active: Optional[bool] = None


# Схема для ответа
class LessonOut(BaseModel):
    id: int
    lesson_name: str
    author: Optional[str] = None
    description: Optional[str]
    type: str
    level: str
    status: str
    rank: float
    sheet_counts: int
    rank_count: int
    author_id: int
    likes: int
    students_count: int
    created_at: datetime
    updated_at: datetime
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class SheetCreate(BaseModel):
    sheet_header: str
    content: str
    timeToRead: int
    sheetType: str
    description_for_video_or_picture: Optional[str]
    video_url: Optional[str]
    picture_url: Optional[str]
    question_text: Optional[str]
    quiz_options: Optional[List[QuizOption]] = None
    content_danger: Optional[str]
    content_advice: Optional[str]


class SheetUpdate(BaseModel):
    sheet_header: Optional[str] = None
    description_for_video_or_picture: Optional[str] = None
    video_url: Optional[str] = None
    picture_url: Optional[str] = None
    question_text: Optional[str] = None
    quiz_options: Optional[List[QuizOption]] = None
    content: Optional[str] = None
    timeToRead: Optional[int] = None
    sheetType: Optional[str] = None
    content_danger: Optional[str] = None
    content_advice: Optional[str] = None


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

class Tag(BaseModel):
    tag: str

class CreateTags(BaseModel):
    lesson_id: int
    tags: list[Tag]

class PersonalLessonOut(BaseModel):
    id: int
    lesson_name: str
    author: Optional[str] = None
    description: Optional[str]
    type: str
    level: str
    status: str
    rank: float
    sheet_counts: int
    rank_count: int
    author_id: int
    likes: int
    students_count: int
    created_at: datetime
    updated_at: datetime
    rank: float

    model_config = ConfigDict(from_attributes=True)
    @field_validator('author', mode='before')
    @classmethod
    def validate_author(cls, v):
        if v and hasattr(v, 'user_name'):
            return v.user_name
        return v

class PersonalLessonResponse(BaseModel):
    lesson: PersonalLessonOut
    progress: int
    is_liked: bool
    is_registered: bool
    author_name: str
    tags: list[str] | None = None
    rank: float | None = None


    @field_validator('tags', mode='before')
    @classmethod
    def validate_tags(cls, v):
        if isinstance(v, str):
            return v.split(',')
        return v 
    model_config = ConfigDict(from_attributes=True)


class PersonalLessonRequest(BaseModel):
    lesson_id: int
    user_id: int

class SheetOut(BaseModel):
    id: int
    sheet_header: str
    content: str
    timeToRead: int
    sheetType: str
    description_for_video_or_picture: Optional[str]
    video_url: Optional[str]
    picture_url: Optional[str]
    question_text: Optional[str]
    quiz_options: Optional[List[QuizOption]] = None
    content_danger: Optional[str]
    content_advice: Optional[str]
    image_public_id: Optional[str]
    model_config = ConfigDict(from_attributes=True)

class SheetResponse(BaseModel):
    sheets: list[SheetOut]
    total: int
    completed_steps: int
    lesson_name: str
    model_config = ConfigDict(from_attributes=True)

class SheetRequest(BaseModel):
    lesson_id: int  
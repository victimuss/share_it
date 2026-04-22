# src/schemas/user.py
from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime


# --- Схема для создания нового пользователя ---
class UserCreate(BaseModel):
    user_name: str
    email: EmailStr
    hashed_password: str


# --- Схема для логина ---
class LoginUser(BaseModel):
    email: EmailStr
    password: str


# --- Схема для отдельного урока пользователя ---
class UserLessonOut(BaseModel):
    lesson_id: int
    lesson_progress: float

    class Config:
        orm_mode = True


# --- Схема для вывода пользователя с уроками ---
class UserOut(BaseModel):
    user_name: str
    description: Optional[str]
    tag: Optional[str]
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        orm_mode = True


# --- Схема для токена и авторизации ---
class TokenOut(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    user: UserOut
    us_likes: int
    us_lessons: int
    us_learn_lessons: int
    
    
class SkillOut(BaseModel):
    id: int
    skill_name: str
    level: str
    class Config:
        orm_mode = True
    
class NewSkill(BaseModel):
    skill_name: str 
    level: str

class UserEdit(BaseModel):
    user_name: Optional[str]
    description: Optional[str]
    tag: Optional[str]
    site: Optional[str]
    telegram: Optional[str]
    avatar: Optional[str]

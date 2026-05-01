from fastapi import FastAPI, HTTPException                                                      
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import timezone, datetime
from pydantic import BaseModel
from typing import Optional
import requests
from pydantic import BaseModel
from auth.jwt_tokens import *
from databases.schemas.schemas_lessons import *
from databases.lesson_db.lessons_db_utils import *
from databases.users_db.user_db_utils import get_last_lession, get_user_lessions
from databases.lesson_db.lesson_db import Lesson
from fastapi import APIRouter
from auth.dependency import get_current_user
from fastapi import status, Depends
from sqlalchemy import select
from databases.users_db.users_db import User

router = APIRouter(prefix="/main_page")
async def get_current_active_user(user=Depends(get_current_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
@router.get('/popular_lessons')
async def popular_lessons(type: Optional[str] = None):    
    cache_key = "main_page_general_info"
    if type:
        cache_key += f"_{type}"
    cached_data = await redis_client.get(cache_key)
    if cached_data:
        return {"popularLessons": json.loads(cached_data)}
    lessons = await get_popular_lessons(type=type)
    if lessons is None:
        raise HTTPException(status_code=404, detail="Популярные уроки не найдены")
    await redis_client.set(cache_key, json.dumps(lessons), ex=60*60*24)
    return {'popularLessons':lessons}


@router.get('/new_lessons')
async def new_lessons(type: Optional[str] = None): 
    cache_key = "new_lessons"
    if type:
        cache_key += f"_{type}"
    cached_data = await redis_client.get(cache_key)
    if cached_data:
        return {"recentLessons": json.loads(cached_data)}
    lessons = await get_new_lessons(type=type)
    if lessons is None:
        raise HTTPException(status_code=404, detail="Новые уроки не найдены")
    await redis_client.set(cache_key, json.dumps(lessons), ex=60*60*24)
    return {'recentLessons':lessons}


@router.post('/current_progress')
async def current_progress(user_id: int):    
    last_lesson = await get_last_lession(user_id)
    if last_lesson is None:
        raise HTTPException(status_code=404, detail="Последний урок пользователя не найден")
    return {"currentLesson": await get_lesson_by_id(last_lesson.lesson_id), "lesson_progress": last_lesson.completed_steps}
    
    
@router.get('/author')
async def get_author(author_id: int):
    async with async_session() as session:
        result = await session.execute(select(User).where(User.id == author_id))
        author = result.scalar_one_or_none()
        return {"author": author.user_name}
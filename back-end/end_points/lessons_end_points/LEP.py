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

router = APIRouter(prefix="/lessons")


async def get_current_active_user(user=Depends(get_current_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@router.get("/get_lesson_by_id")
async def get_les_by_id(lesson_id: int):
    return await get_lesson_by_id(lesson_id)


@router.post("/new_lesson")
async def new_les(
    lesson_data: LessonCreate, current_user=Depends(get_current_active_user)
):
    return await new_lesson(lesson_data, current_user)


@router.post("/new_sheet")
async def new_she(
    sheet_data: SheetCreate, current_user=Depends(get_current_active_user)
):
    return await new_sheet(sheet_data, current_user)


@router.post("/update_lesson")
async def update_les(
    lesson_id: int,
    lesson_data: LessonUpdate,
    current_user=Depends(get_current_active_user),
):
    return await update_lesson(lesson_id, lesson_data, current_user)


@router.post("/update_sheet")
async def update_sh(
    lesson_id: int,
    sheet_id: int,
    sheet_data: SheetUpdate,
    current_user=Depends(get_current_active_user),
):
    return await update_sheet(lesson_id, sheet_id, sheet_data, current_user)


@router.delete("/delete_sheet")
async def delete_sh(
    lesson_id: int, sheet_id: int, current_user=Depends(get_current_active_user)
):
    return await delete_sheet(lesson_id, sheet_id, current_user)


@router.delete("/delete_lesson")
async def delete_les(lesson_id: int, current_user=Depends(get_current_active_user)):
    return await delete_lesson(lesson_id, current_user)


@router.post("/user_lessons")
async def get_user_lessons(current_user=Depends(get_current_active_user)):
    return await get_user_lessions(current_user)


@router.post("/like_lesson")
async def like_les(
    lesson_id: int, like: bool, current_user=Depends(get_current_active_user)
):
    return await like_lection(lesson_id, like, current_user)


@router.post("/reg_les")
async def reg_les(
    lesson_id: int,
    reg: bool,
    current_user=Depends(get_current_active_user),
):
    return await register_lesson(lesson_id, current_user, reg)


@router.post("/rank_lesson")
async def rank_les(
    lesson_id: int, rank: int, current_user=Depends(get_current_active_user)
):
    return await rank_lesson(lesson_id, rank, current_user)


@router.get("/popular_tags")
async def popular_tages():
    return await popular_tags()


@router.post("/search_lessons", response_model=SearchLessonsResponse)
async def api_search_lessons(search_req: SearchLessonsRequest):
    return await search_lessons(
        search_req.search, search_req.type, search_req.level, search_req.page, search_req.order
    )

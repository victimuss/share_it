from fastapi import FastAPI, HTTPException                                                      
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import timezone, datetime
from pydantic import BaseModel
from typing import Optional
import requests
from pydantic import BaseModel
from auth.jwt_tokens import *
from databases.schemas.schemas_user import *
from databases.users_db.user_db_utils import add_skill, add_user, authenticate_user, edit_skill, get_last_lession, get_maked_lessons, get_user_learn_lessons, get_user_lessions, get_users_skills , edit_user, set_progress, get_users_lessons_for_edit
from databases.users_db.users_db import User
from fastapi import APIRouter
from auth.dependency import get_current_user
from fastapi import status, Depends
from databases.schemas.schemas_lessons import MyLessonsResponse

async def get_current_active_user(user=Depends(get_current_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
router = APIRouter(prefix="/users")
 
# @router.post ('/signup', response_model=UserOut) #Убрано из кода пока идёт тестирование и решаются юридичские вопросы
# async def auth_us(us_data: UserCreate):
#     try:
#         new_user = await add_user(us_data)
#         return new_user
#     except ValueError as e:  # ловим дубли / уникальные ограничения
#         raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=TokenOut)
async def login_user(login_data: LoginUser):
    user = await authenticate_user(login_data)
    if not user:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    
    access_token = create_access_token({"sub": str(user['user'].id)})
    refresh_token = create_refresh_token({"sub": str(user['user'].id)})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
                "user_name": user['user'].user_name,
                'description': user['user'].description,
                'tag': user['user'].tag,   
                "created_at": user['user'].created_at,
                "updated_at": user['user'].updated_at,      
                "is_active": user['user'].is_active,
        }, 
        'us_likes': user['us_likes'],
        'us_lessons': user['us_lessons'],
        'us_learn_lessons': user['us_learn_lessons']
    }


@router.post("/refresh")
def refresh_token(refresh_token: str):
    try:
        payload = verify_token(refresh_token)

        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")

        user_id = payload.get("sub")

        new_access_token = create_access_token({"sub": user_id})

        return {"access_token": new_access_token}

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
@router.get('/last_lession')
async def get_last_lessions(current_user =  Depends(get_current_active_user)):
    last_lesson = await get_last_lession(current_user)
    if last_lesson: 
        return({"last_lession": last_lesson})
    else:
        raise HTTPException(status_code=404, detail="Последний урок не найден")

@router.post('/user_lessons')
async def get_user_lessons(user_id: int):    
    lessons = await get_user_lessions(user_id)
    if lessons is None:
        raise HTTPException(status_code=404, detail="Уроки пользователя не найдены")
    return [{"lesson_id": lesson.lesson_id, "lesson_progress": lesson.lesson_progress} for lesson in lessons]   

@router.get('/users_skills', response_model=list[SkillOut])
async def get_user_sk(current_user =  Depends(get_current_active_user)):    
    skills = await get_users_skills(current_user)
    if skills is None:
        raise HTTPException(status_code=404, detail="Навыки пользователя не найдены")
    return skills

@router.post('/new_skill')
async def add_sk(skill_data: NewSkill, current_user =  Depends(get_current_active_user)):
    return await add_skill(current_user, skill_data)

@router.post('/edit_skill')
async def edit_sk(skill_id: int, skill_data: NewSkill, current_user =  Depends(get_current_active_user)):
    return await edit_skill(current_user, skill_id, skill_data)


@router.get('/users_learned')
async def test(current_user =  Depends(get_current_active_user)):
    return await get_user_learn_lessons(current_user)

@router.get('/user_maked_lessons')
async def test(current_user =  Depends(get_current_active_user)):
    return await get_maked_lessons(current_user)

@router.post('/edit_user')
async def edit_us(user_data: UserEdit, current_user =  Depends(get_current_active_user)):
    return await edit_user(current_user, user_data) 



@router.post('/set_progress')
async def set_pro(progress: int, lesson_id: int, current_user =  Depends(get_current_active_user)):
    return await set_progress(current_user, progress, lesson_id)

@router.get('/user_lessons_for_edit', response_model=MyLessonsResponse)
async def get_user_lessons_for_edit_a(current_user =  Depends(get_current_active_user)):
    return await get_users_lessons_for_edit(current_user)

from databases.users_db.users_db import User, Base, UsersSkills
from databases.main_databases import async_session, engine
import asyncio
from sqlalchemy import *
from fastapi import HTTPException
from typing import Optional
from databases.schemas.schemas_user import NewSkill, SkillOut, UserCreate, LoginUser
from databases.lesson_db.lessons_db_utils import *
from auth.auth import hash_password, verify_password
from sqlalchemy.exc import IntegrityError
from databases.users_db.users_db import UserLesson
def calculate_progress(total_steps: int, completed_steps: int) -> float:
    if total_steps == 0:
        return 0.0  
    return (completed_steps / total_steps) * 100
async def add_user(user_data: UserCreate):
    async with async_session() as session:
        new_user = User(
            user_name=user_data.user_name,
            email=user_data.email,
            hashed_password=hash_password(user_data.hashed_password),
        )
        session.add(new_user)
        try:
            await session.commit()
            await session.refresh(new_user)
            return new_user
        except IntegrityError:
            await session.rollback()
            raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")
        
async def authenticate_user(user_data: LoginUser) -> Optional[User]:
    async with async_session() as session:
        result = await session.execute(select(User).where(User.email == user_data.email))
        user = result.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=401, detail="Неверный email или пароль")
        if verify_password(user_data.password, user.hashed_password):
            us_likes = await session.execute(
                select(func.sum(Lesson.likes)).where(Lesson.author_id == user.id))
            us_lessons = await session.execute(
                select(func.count(Lesson.id)).where(Lesson.author_id == user.id))
            us_learn_lessons = await session.execute(
                select(func.count(UserLesson.id)).where(UserLesson.user_id == user.id))
            likes = us_likes.scalar() or 0
            lessons = us_lessons.scalar() or 0
            learn_lessons = us_learn_lessons.scalar() or 0
            return {
                'user': user,
                'us_likes': likes,
                'us_lessons': lessons,
                'us_learn_lessons': learn_lessons
            }
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    
async def get_last_lession(user_id: int):
    async with async_session() as session:
        result = await session.execute(select(UserLesson).where(UserLesson.user_id == user_id).order_by(UserLesson.updated_at.desc()).limit(1))
        last_lesson = result.scalar_one_or_none()
        try:
            les = await get_lesson_by_id(last_lesson.lesson_id)
        except Exception:
            return HTTPException(status_code=404, detail="Последний урок не найден")
        return {'last_lession':last_lesson, 
                'lesson':les} if les else None
    
async def get_user_lessions(user_id: int):
    async with async_session() as session:
        result = await session.execute(select(UserLesson).where(UserLesson.user_id == user_id))
        lessons = result.scalars().all()
        return lessons
    
async def set_progress(user_id:int, progress: int, lession_id:int):
    async with async_session() as session:
        result = await session.execute(update(UserLesson).where(UserLesson.user_id == user_id).where(UserLesson.lesson_id == lession_id).values(lesson_progress=progress))
        await session.commit()
        

async def set_lession(user_id: int, lession_id:int):
    async with async_session() as session:
        new_les = UserLesson(user_id=user_id, lesson_id=lession_id)
        session.add(new_les)
        await session.commit()
        await session.refresh(new_les)
        return new_les
    
async def get_progress(user_id: int, lession_id:int):
    async with async_session() as session:
        steps = await session.execute(
            select(UserLesson)
            .where(UserLesson.user_id == user_id)
            .where(UserLesson.lesson_id == lession_id)
        )

        lesson = await session.execute(
            select(Lesson).where(Lesson.id == lession_id)
        )

        user_lesson = steps.scalar_one_or_none()
        lesson_obj = lesson.scalar_one_or_none()

        if lesson_obj is None:
            raise ValueError("Lesson not found")

        if user_lesson is None:
            return 0.0

        return calculate_progress(
            lesson_obj.sheet_counts,
            user_lesson.completed_steps
        )
        
        
async def get_users_skills(user_id: int):
    async with async_session() as session:
        result = await session.execute(select(UsersSkills).where(User.id == user_id))
        user = result.scalars().all()
        return user
    
async def add_skill(user_id: int, skill_data: NewSkill):
    async with async_session() as session:
        new_skill = UsersSkills(user_id=user_id, skill_name=skill_data.skill_name, level=skill_data.level)
        session.add(new_skill)
        await session.commit()
        await session.refresh(new_skill)
        return {'skill' : SkillOut(id=new_skill.id,skill_name=new_skill.skill_name, level=new_skill.level)}
    
    
async def edit_skill(user_id: int, skill_id: int, skill_data: NewSkill):
    async with async_session() as session:
        result = await session.execute(select(UsersSkills).where(UsersSkills.id == skill_id).where(UsersSkills.user_id == user_id))
        skill = result.scalar_one_or_none()
        if skill is None:
            raise HTTPException(status_code=404, detail="Skill not found")
        skill.skill_name = skill_data.skill_name
        skill.level = skill_data.level
        await session.commit()
        await session.refresh(skill)
        return {'skill' : SkillOut(skill_name=skill.skill_name, level=skill.level)}
    
    
async def get_user_learn_lessons(user_id: int):
    async with async_session() as session:
        result = await session.execute(select(UserLesson).where(UserLesson.user_id == user_id))
        lessonsk = result.scalars().all()
        lessons = [None] * len(lessonsk)
        for i in range(len(lessonsk)):
            result = await session.execute(select(Lesson).where(Lesson.id == lessonsk[i].lesson_id))
            lessons[i] = result.scalar_one_or_none()
        return {'learnLessons':lessonsk, 'lessons':lessons}
    
async def get_maked_lessons(user_id: int):
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.author_id == user_id))
        lessons = result.scalars().all()
        return {'lessons':lessons}

async def edit_user(user_id: int, user_data: UserEdit):
    async with async_session() as session:
        result = await session.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        user.user_name = user_data.user_name
        user.description = user_data.description
        user.tag = user_data.tag
        user.site = user_data.site
        user.telegram = user_data.telegram
        user.avatar = user_data.avatar
        await session.commit()
        await session.refresh(user)
        return {'user' : UserOut(user_name=user.user_name, description=user.description, tag=user.tag, site=user.site, telegram=user.telegram, avatar=user.avatar)}
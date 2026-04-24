from databases.users_db.users_db import User
from databases.main_databases import async_session
from sqlalchemy import *
from fastapi import HTTPException, status
from typing import Optional
from databases.lesson_db.lesson_db import (
    Lesson,
    LessonSheet,
    LessonRank,
    LessonLike,
    RegistedUsers,
    LessonTag,
)
from databases.users_db.users_db import UserLesson
from databases.schemas.schemas_lessons import *
from sqlalchemy.orm import joinedload
import asyncio
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
import json
from cloud_storage.s3main import delete_image_from_cloud_for_DB
import base64


async def get_lesson_by_id(lesson_id: int, user_id: int) -> Optional[Lesson]:
    async with async_session() as session:
        tags_subquery = (
            select(func.group_concat(LessonTag.tag, ', '))
            .where(LessonTag.lesson_id == Lesson.id)
            .scalar_subquery()
        )
        query = (
            select(Lesson, UserLesson.completed_steps, LessonLike.user_id, LessonRank.rank, RegistedUsers.user_id, User.user_name, tags_subquery.label('tags_list'))
            .outerjoin(UserLesson, and_(
                UserLesson.lesson_id == Lesson.id, 
                UserLesson.user_id == user_id
            ))
            .options(joinedload(Lesson.author))
            .outerjoin(LessonLike, and_(
                LessonLike.lesson_id == Lesson.id, 
                LessonLike.user_id == user_id
            ))
            .outerjoin(LessonRank, and_(
                LessonRank.lesson_id == Lesson.id, 
                LessonRank.user_id == user_id,
            ))
            .outerjoin(RegistedUsers, and_(
                RegistedUsers.lesson_id == Lesson.id, 
                RegistedUsers.user_id == user_id
            ))
            .join(User, Lesson.author_id == User.id)
            .where(Lesson.id == lesson_id)
            .where(Lesson.status == "ACTIVE")
        )
        result = await session.execute(query)
        row = result.unique().first()
        print(row)
        if not row:
            return None
            
        return row

async def get_all_lessons() -> Optional[Lesson]:
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.status == "ACTIVE"))
        lessons = result.scalars().all()
        return lessons


async def get_popular_lessons(
    limit: int = 3, type: Optional[str] = None
) -> Optional[list]:
    async with async_session() as session:
        query = (
            select(Lesson, User.user_name)
            .join(User, Lesson.author_id == User.id)
            .where(Lesson.status == "ACTIVE")
            .order_by(Lesson.likes.desc())
            .limit(limit)
        )
        
        if type is not None:
            query = query.where(Lesson.type == type)
            
        result = await session.execute(query)
        
        popular_lessons = []
        for lesson, author_name in result.all():
            popular_lessons.append({
                "lesson": lesson, 
                "author": author_name
            })
            
        return popular_lessons


async def get_new_lessons(
    limit: int = 3, type: Optional[str] = None
) -> Optional[list]:
    async with async_session() as session:
        query = (
            select(Lesson, User.user_name)
            .join(User, Lesson.author_id == User.id)
            .where(Lesson.status == "ACTIVE")
            .order_by(Lesson.created_at.desc())
            .limit(limit)
        )   
        
        if type is not None:
            query = query.where(Lesson.type == type)
            
        result = await session.execute(query)
        
        new_lessons = []
        for lesson, author_name in result.all():
            new_lessons.append({
                "lesson": lesson, 
                "author": author_name
            })
            
        return new_lessons


async def get_lesson_by_type(lesson_type: str):
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.type == lesson_type).where(Lesson.status == "ACTIVE"))
        lessons = result.scalars().all()
        return lessons


async def new_sheet(sheet_data: SheetCreate, author_id: int, lesson_id: int):
    async with async_session() as session:
        res = await session.execute(select(Lesson).where(Lesson.id == lesson_id).where(Lesson.author_id == author_id))
        lesson = res.scalar_one_or_none()
        if lesson is None:
            raise HTTPException(status_code=404, detail="Lesson not found")
        sheet_dict = sheet_data.model_dump(exclude_unset=True)
        new_sheet = LessonSheet(
            **sheet_dict,
            content_id=lesson_id,
            author_id=author_id
        )

        session.add(new_sheet)
        await session.commit()
        await session.refresh(new_sheet)
        
        return new_sheet


async def new_lesson(lesson_data: LessonCreate, author_id: int):
    async with async_session() as session:
        new_lesson = Lesson(
            lesson_name=lesson_data.lesson_name,
            description=lesson_data.description,
            author_id=author_id,
            type=lesson_data.type,
            level=lesson_data.level,
        )
        session.add(new_lesson)
        await session.commit()
        await session.refresh(new_lesson)
        return new_lesson

async def edit_lesson(lesson_data: LessonUpdate, author_id: int, lesson_id: int):
    async with async_session() as session:
        res = await session.execute(select(Lesson).where(Lesson.id == lesson_id).where(Lesson.author_id == author_id))
        lesson = res.scalar_one_or_none()
        if lesson is None:
            raise HTTPException(status_code=404, detail="Lesson not found")
        lesson_dict = lesson_data.model_dump(exclude_unset=True)
        for key, value in lesson_dict.items():
            setattr(lesson, key, value)
        await session.commit()
        await session.refresh(lesson)
        return lesson

async def edit_sheet(sheet_data: SheetUpdate, author_id: int, sheet_id: int):
    async with async_session() as session:
        res = await session.execute(select(LessonSheet).where(LessonSheet.id == sheet_id).where(LessonSheet.author_id == author_id))
        sheet = res.scalar_one_or_none()
        if sheet is None:
            raise HTTPException(status_code=404, detail="Sheet not found")
        sheet_dict = sheet_data.model_dump(exclude_unset=True)
        for key, value in sheet_dict.items():
            setattr(sheet, key, value)
        await session.commit()
        await session.refresh(sheet)
        return sheet

async def delete_sheet(sheet_id: int, author_id: int, lesson_id: int):
    async with async_session() as session:
        res = await session.execute(select(LessonSheet).where(LessonSheet.id == sheet_id).where(LessonSheet.author_id == author_id).where(LessonSheet.content_id == lesson_id))
        sheet = res.scalar_one_or_none()
        if sheet is None:
            raise HTTPException(status_code=404, detail="Sheet not found")
        delete_image_from_cloud_for_DB(sheet.image_public_id)
        await session.delete(sheet)
        await session.commit()
        return {"message": "Sheet deleted successfully"}


async def like_lection(lesson_id: int, like: bool, user_id: int):
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.id == lesson_id).where(Lesson.status == "ACTIVE"))
        lesson = result.scalar_one_or_none()
        if lesson is None:
            raise HTTPException(status_code=404, detail="Lesson not found")

        existing_result = await session.execute(
            select(LessonLike).where(
                LessonLike.user_id == user_id, LessonLike.lesson_id == lesson_id
            )
        )
        existing = existing_result.scalar_one_or_none()

        if like:
            if not existing:
                new_like = LessonLike(user_id=user_id, lesson_id=lesson_id)
                session.add(new_like)
                lesson.likes += 1
        else:
            if existing:
                await session.delete(existing)
                lesson.likes = max(lesson.likes - 1, 0)

        await session.commit()
        await session.refresh(lesson)

        return {"lesson_id": lesson.id, "likes": lesson.likes}


async def register_lesson(lesson_id: int, user_id: int, register: bool):
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.id == lesson_id).where(Lesson.status == "ACTIVE"))
        lesson = result.scalar_one_or_none()
        if lesson is None:
            raise HTTPException(status_code=404, detail="Lesson not found")

        existing_result = await session.execute(
            select(RegistedUsers).where(
                RegistedUsers.user_id == user_id, RegistedUsers.lesson_id == lesson_id
            )
        )
        existing = existing_result.scalar_one_or_none()

        if register:
            if not existing:
                new_reg = RegistedUsers(user_id=user_id, lesson_id=lesson_id)
                new_r = UserLesson(
                    user_id=user_id, lesson_id=lesson_id, completed_steps=0
                )
                session.add(new_reg)
                session.add(new_r)
                lesson.rank_count += 1
        else:
            if existing:
                await session.delete(existing)
                await session.execute(
                    delete(UserLesson)
                    .where(UserLesson.lesson_id == lesson_id)
                    .where(UserLesson.user_id == user_id)
                )
                lesson.rank_count = max(lesson.rank_count - 1, 0)

        await session.commit()
        await session.refresh(lesson)

        return {"lesson_id": lesson.id, "regs": lesson.rank_count}


async def rank_lesson(lesson_id: int, rank: int, user_id: int):
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.id == lesson_id).where(Lesson.status == "ACTIVE"))
        lesson = result.scalar_one_or_none()
        if lesson is None:
            raise HTTPException(status_code=404, detail="Lesson not found")
        res = await session.execute(
            select(LessonRank)
            .where(LessonRank.user_id == user_id)
            .where(LessonRank.lesson_id == lesson_id)
        )
        existing = res.scalar_one_or_none()
        if existing:
            cur_rank = existing.rank
            lesson.rank -= cur_rank
            lesson.rank += rank
            existing.rank = rank
        else:
            lesson.rank += rank
            lesson.rank_count += 1
            new_reg = LessonRank(user_id=user_id, lesson_id=lesson_id, rank=rank)
            session.add(new_reg)
        await session.commit()
        await session.refresh(lesson)
        return {"lesson_id": lesson.id, "rank": lesson.rank, "count": lesson.rank_count}


async def delete_lesson(lesson_id: int, user_id: int):
    async with async_session() as session:
        result = await session.execute(
            select(Lesson).where(Lesson.id == lesson_id, Lesson.author_id == user_id)
        )
        lesson = result.scalar_one_or_none()
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")
        sheets_with_images = await session.execute(
            select(LessonSheet.image_public_id)
            .where(LessonSheet.content_id == lesson_id)
        )
        public_ids_to_delete = [pid for pid in sheets_with_images.scalars() if pid]

        for pid in public_ids_to_delete:
            await delete_image_from_cloud(pid)
        await session.execute(
            delete(LessonRank).where(LessonRank.lesson_id == lesson_id)
        )
        await session.execute(
            delete(RegistedUsers).where(RegistedUsers.lesson_id == lesson_id)
        )
        await session.execute(
            delete(LessonLike).where(LessonLike.lesson_id == lesson_id)
        )
        await session.execute(
            delete(LessonSheet).where(LessonSheet.content_id == lesson_id)
        )
        await session.delete(lesson)
        await session.commit()
        return {"message": "Lesson deleted"}




async def get_users_lessons(user_id: int):
    async with async_session() as session:
        result = await session.execute(
            select(Lesson).where(Lesson.author_id == user_id)
        )
        lessons = result.scalars().all()
        return lessons


async def get_author(user_id: int):
    async with async_session() as session:
        result = await session.execute(select(User.user_name).where(User.id == user_id).where(User.is_active == True))
        user = result.scalar_one_or_none()
        return user


async def popular_tags():
    async with async_session() as session:
        result = await session.execute(
            select(LessonTag.tag)
            .group_by(LessonTag.tag)
            .order_by(func.count(LessonTag.tag).desc())
            .limit(5)
        )
        tags = result.scalars().all()
        return {"popular_tags": tags}


async def search_lessons(
    search: str, type: Optional[str], level: Optional[str], page: int, order: Optional[str]
):
    async with async_session() as session:
        conditions = []
        if search:
            tag_subquery = select(LessonTag.lesson_id).where(LessonTag.tag.ilike(f"%{search}%"))
            
            conditions.append(
                or_(
                    Lesson.lesson_name.ilike(f"%{search}%"),
                    User.user_name.ilike(f"%{search}%"),
                    Lesson.id.in_(tag_subquery),
                )
            )
            
        if type:
            conditions.append(Lesson.type == type)
        if level:
            conditions.append(Lesson.level == level)

        count_query = (
            select(func.count(Lesson.id)) 
            .join(User, Lesson.author_id == User.id)
            .where(Lesson.status == "ACTIVE")
        )
        for c in conditions:
            count_query = count_query.where(c)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        query = (
            select(Lesson, User.user_name)
            .join(User, Lesson.author_id == User.id)
            .where(Lesson.status == "ACTIVE")
        )
        for c in conditions:
            query = query.where(c)

        if order:
            if order.lower() in ("popular", "likes"):
                query = query.order_by(Lesson.likes.desc())
            elif order.lower() in ("new", "newest", "recent", "created_at"):
                query = query.order_by(Lesson.created_at.desc())
            elif order.lower() in ("rating", "rank"):
                query = query.order_by(Lesson.rank.desc())

        query = query.limit(5).offset((page - 1) * 5)

        result = await session.execute(query)

        lessons_data = []
        for lesson, user_name in result.all():
            lesson_dict = {
                c.name: getattr(lesson, c.name) for c in lesson.__table__.columns
            }
            lesson_dict["author"] = user_name
            lesson_dict["sheet_counts"] = lesson.sheet_counts
            lessons_data.append(lesson_dict)

        return {"lessons": lessons_data, "total": total}
    async with async_session() as session:
        conditions = []
        if search:
            conditions.append(
                or_(
                    Lesson.lesson_name.ilike(f"%{search}%"),
                    User.user_name.ilike(f"%{search}%"),
                    LessonTag.tag.ilike(f"%{search}%"),
                )
            )
        if type:
            conditions.append(Lesson.type == type)
        if level:
            conditions.append(Lesson.level == level)

        count_query = (
            select(func.count(Lesson.id.distinct()))
            .join(User, Lesson.author_id == User.id)
            .outerjoin(LessonTag, Lesson.id == LessonTag.lesson_id)
            .where(Lesson.status == "ACTIVE")
        )
        for c in conditions:
            count_query = count_query.where(c)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        query = (
            select(Lesson, User.user_name)
            .join(User, Lesson.author_id == User.id)
            .outerjoin(LessonTag, Lesson.id == LessonTag.lesson_id)
            .where(Lesson.status == "ACTIVE")
        )
        for c in conditions:
            query = query.where(c)

        if order:
            if order.lower() in ("popular", "likes"):
                query = query.order_by(Lesson.likes.desc())
            elif order.lower() in ("new", "newest", "recent", "created_at"):
                query = query.order_by(Lesson.created_at.desc())
            elif order.lower() in ("rating", "rank"):
                query = query.order_by(Lesson.rank.desc())
            else:
                try:
                    #query = query.order_by(text(order)) #убрано в угоду безопасности
                    pass
                except:
                    pass

        query = query.limit(5).offset((page - 1) * 5)

        result = await session.execute(query)

        lessons_data = []
        for lesson, user_name in result.unique().all():
            lesson_dict = {
                c.name: getattr(lesson, c.name) for c in lesson.__table__.columns
            }
            lesson_dict["author"] = user_name
            lesson_dict["sheet_counts"] = lesson.sheet_counts
            lessons_data.append(lesson_dict)

        return {"lessons": lessons_data, "total": total}


async def check_content_author(content_id: int, user_id: int):
    pass


import json
import asyncio
from sqlalchemy import select
from groq import AsyncGroq 

client = AsyncGroq()

async def checker(lesson_id: int, max_retries: int = 3):
    async with async_session() as session:
        lesson_res = await session.execute(select(Lesson).where(Lesson.id == lesson_id))
        lesson = lesson_res.scalar_one_or_none()
        
        if not lesson:
            return json.dumps({"status": False, "reason": "Урок не найден"}, ensure_ascii=False)

        sheets_res = await session.execute(
            select(LessonSheet)
            .where(LessonSheet.content_id == lesson_id) 
            .order_by(LessonSheet.id)
        )
        sheets = sheets_res.scalars().all()

    if not sheets:
        return json.dumps({"status": False, "reason": "Урок пуст, нечего проверять"}, ensure_ascii=False)

    full_text = "--- ОБЩИЕ ДАННЫЕ УРОКА ---\n"
    full_text += f"Название урока: {lesson.lesson_name}\n"
    if lesson.description:
        full_text += f"Описание урока: {lesson.description}\n\n"

    for idx, sheet in enumerate(sheets, 1):
        full_text += f"--- СТРАНИЦА {idx} ---\n"
        
        if getattr(sheet, 'sheet_header', None):
            full_text += f"Заголовок листа: {sheet.sheet_header}\n"
        if getattr(sheet, 'content', None):
            full_text += f"Основной текст: {sheet.content}\n"
        if getattr(sheet, 'description_for_video_or_picture', None):
            full_text += f"Описание медиа: {sheet.description_for_video_or_picture}\n"
        if getattr(sheet, 'question_text', None):
            full_text += f"Вопрос квиза: {sheet.question_text}\n"
        if getattr(sheet, 'quiz_options', None):
            full_text += f"Варианты ответа: {json.dumps(sheet.quiz_options, ensure_ascii=False)}\n"
        
        full_text += "\n"

    prompt = f"""
    Проверь всё "досье" урока на легальность, насилие, оскорбления, мат и вредные советы.
    Внимание: нарушения могут быть спрятаны где угодно (в названии, текстах, вопросах квиза или вариантах ответов).
    
    Если всё абсолютно чисто, верни строго JSON: {{"status": true}}
    Если есть нарушения, точно укажи ГДЕ оно найдено, и верни JSON: 
    {{"status": false, "reason": "краткая причина", "error_location": "Например: 'Страница 2, Варианты ответа'"}}
    
    Досье урока: 
    {full_text}
    """

    # 4. Цикл запросов в Groq
    for attempt in range(max_retries):
        try:
            chat_completion = await client.chat.completions.create(
                messages=[
                    {
                      
                        "role": "system",
                        "content": "Ты — строгий модератор образовательной платформы. Ты возвращаешь ответы СТРОГО в формате валидного JSON."
                    },
                    {
                       
                        "role": "user",
                        "content": prompt
                    }
                ],
                model="llama-3.3-70b-versatile", 
                temperature=0.1,
                response_format={"type": "json_object"} 
            )
            
            result_text = chat_completion.choices[0].message.content
            return result_text 
            
        except Exception as e:
            error_msg = str(e).lower()
            if "429" in error_msg or "rate limit" in error_msg:
                wait_time = 60 * (attempt + 1)
                print(f"⚠️ Лимит запросов Groq API. Ждем {wait_time} сек... (Попытка {attempt + 1}/{max_retries})")
                await asyncio.sleep(wait_time)
            else:
                print(f"❌ Критическая ошибка ИИ модератора: {e}")
                return json.dumps({
                    "status": False, 
                    "reason": f"Ошибка сервера модерации", 
                    "error_location": "Сервер"
                }, ensure_ascii=False)
                
    return json.dumps({
        "status": False, 
        "reason": "Система модерации временно перегружена. Попробуйте сохранить позже.", 
        "error_location": "Сервер"
    }, ensure_ascii=False)

async def media_checker(image_data: bytes, image_type: str):
    base64_image = base64.b64encode(image_data).decode('utf-8')

    try:
        chat_completion = await client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Ты — модератор. Проверь, нет ли на фото эротики, насилия, политики или треша. Ответь СТРОГО JSON: {'safe': true} или {'safe': false, 'reason': '...'}"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            response_format={"type": "json_object"},
            temperature=0.1
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"❌ Ошибка в media_checker: {e}")
        return json.dumps({"safe": False, "reason": "Moderation skipped due to error"})

async def add_tags(tags: CreateTags, current_user: int):
    async with async_session() as session:
        result = await session.execute(
            select(Lesson).where(Lesson.id == tags.lesson_id)
        )
        lesson = result.scalar_one_or_none()
        if not lesson:
            return {"status": False, "reason": f"Урок не найден{tags.lesson_id}"}
        if lesson.author_id != int(current_user):
            return {"status": False, "reason": f"У вас нет прав на редактирование этого урока {lesson.author_id} {current_user}"}
        try:
            for tag in tags.tags:
                session.add(LessonTag(lesson_id=tags.lesson_id, tag=tag.tag))
            await session.commit()
            return {"status": True}
        except Exception as e:
            return {"status": False, "reason": str(e)}

async def get_sheets(lesson_id: int, user_id: int):
    async with async_session() as session:
        stmt = (
            select(Lesson,UserLesson.completed_steps)
            .options(joinedload(Lesson.sheets)) 
            .where(Lesson.id == lesson_id)
            .outerjoin(UserLesson, and_(
                UserLesson.lesson_id == Lesson.id,
                UserLesson.user_id == user_id
            ))
        )
        
        result = await session.execute(stmt)
        row = result.unique().one_or_none()
        if not row:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Урок {lesson_id} не найден"
            )
        lesson = row[0]
        completed_steps = row[1]

        if lesson.status != "ACTIVE":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Урок не активен"
            )

        return {
            "sheets": lesson.sheets,
            "lesson_name": lesson.lesson_name,
            "total": len(lesson.sheets),
            "completed_steps": completed_steps if completed_steps else 0
        }
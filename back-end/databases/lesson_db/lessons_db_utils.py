from databases.users_db.users_db import User
from databases.main_databases import async_session
from sqlalchemy import *
from fastapi import HTTPException
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


async def get_lesson_by_id(lesson_id: int) -> Optional[Lesson]:
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.id == lesson_id))
        lesson = result.scalar_one_or_none()
        return lesson


async def get_all_lessons() -> Optional[Lesson]:
    async with async_session() as session:
        result = await session.execute(select(Lesson))
        lessons = result.scalars().all()
        return lessons


async def get_popular_lessons(
    limit: int = 3, type: Optional[str] = None
) -> Optional[Lesson]:
    async with async_session() as session:
        query = (select(Lesson).order_by(Lesson.likes.desc()).limit(limit)).join(
            User, Lesson.author_id == User.id
        )
        if type is not None:
            query = query.where(Lesson.type == type)
        result = await session.execute(query)
        popular_lessons = []
        for lesson in result.scalars().all():
            popular_lessons.append(
                {"lesson": lesson, "author": await get_author(lesson.author_id)}
            )
        return popular_lessons


async def get_new_lessons(
    limit: int = 3, type: Optional[str] = None
) -> Optional[Lesson]:
    async with async_session() as session:
        query = (select(Lesson).order_by(Lesson.created_at.desc()).limit(limit)).join(
            User, Lesson.author_id == User.id
        )
        if type is not None:
            query = query.where(Lesson.type == type)
        result = await session.execute(query)
        new_lessons = []
        for lesson in result.scalars().all():
            new_lessons.append(
                {"lesson": lesson, "author": await get_author(lesson.author_id)}
            )
        return new_lessons


async def get_lesson_by_type(lesson_type: str):
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.type == lesson_type))
        lessons = result.scalars().all()
        return lessons


async def new_sheet(sheet_data: SheetCreate, author_id: int):
    async with async_session() as session:
        new_sheet = LessonSheet(
            content_id=sheet_data.content_id,
            sheet_header=sheet_data.sheet_header,
            content=sheet_data.content,
            timeToRead=sheet_data.timeToRead,
            sheetType=sheet_data.sheetType,
            author_id=author_id,
            content_danger=sheet_data.content_danger,
            content_advice=sheet_data.content_advice,
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


async def plus_minus_sheet(sheet_id: int, plus: bool):
    async with async_session() as session:
        result = await session.execute(
            select(LessonSheet).where(LessonSheet.id == sheet_id)
        )
        sheet = result.scalar_one_or_none()
        if sheet is None:
            raise HTTPException(status_code=404, detail="Sheet not found")
        if plus:
            sheet.sheet_counts += 1
        else:
            sheet.sheet_counts -= 1
        await session.commit()
        await session.refresh(sheet)
        return sheet


async def like_lection(lesson_id: int, like: bool, user_id: int):
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.id == lesson_id))
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
        result = await session.execute(select(Lesson).where(Lesson.id == lesson_id))
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
        result = await session.execute(select(Lesson).where(Lesson.id == lesson_id))
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


async def update_lesson(lesson_id: int, lesson_data: LessonUpdate, user_id: int):
    async with async_session() as session:
        result = await session.execute(
            select(Lesson)
            .where(Lesson.id == lesson_id)
            .where(Lesson.author_id == user_id)
        )
        lesson = result.scalar_one_or_none()
        if lesson is None:
            raise HTTPException(status_code=404, detail="Lesson not found")
        for key, value in lesson_data.dict(exclude_unset=True).items():
            setattr(lesson, key, value)
        await session.commit()
        await session.refresh(lesson)
        return lesson


async def update_sheet(
    lesson_id: int, sheet_id: int, sheet_data: SheetUpdate, user_id: int
):
    async with async_session() as session:
        result = await session.execute(
            select(LessonSheet)
            .where(LessonSheet.id == sheet_id)
            .where(LessonSheet.lesson_id == lesson_id)
            .where(LessonSheet.author_id == user_id)
        )
        sheet = result.scalar_one_or_none()
        if sheet is None:
            raise HTTPException(status_code=404, detail="Sheet not found")
        for key, value in sheet_data.dict(exclude_unset=True).items():
            setattr(sheet, key, value)
        await session.commit()
        await session.refresh(sheet)
        return sheet


async def delete_lesson(lesson_id: int, user_id: int):
    async with async_session() as session:
        result = await session.execute(
            select(Lesson).where(Lesson.id == lesson_id, Lesson.author_id == user_id)
        )
        lesson = result.scalar_one_or_none()
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")

        await session.execute(
            delete(LessonRank).where(LessonRank.lesson_id == lesson_id)
        )
        await session.execute(
            delete(RegistedUsers).where(RegistedUsers.lesson_id == lesson_id)
        )
        await session.execute(
            delete(LessonLike).where(LessonLike.lesson_id == lesson_id)
        )
        await session.delete(lesson)

        await session.commit()
        return {"message": "Lesson deleted"}


async def delete_sheet(content_id: int, sheet_id: int, user_id: int):
    async with async_session() as session:
        result = await session.execute(
            select(LessonSheet)
            .where(LessonSheet.id == sheet_id)
            .where(LessonSheet.content_id == content_id)
            .where(LessonSheet.author_id == user_id)
        )
        sheet = result.scalar_one_or_none()
        if sheet is None:
            raise HTTPException(status_code=404, detail="Sheet not found")
        await session.delete(sheet)
        await session.commit()
        return {"message": "Sheet deleted"}


async def get_users_lessons(user_id: int):
    async with async_session() as session:
        result = await session.execute(
            select(Lesson).where(Lesson.author_id == user_id)
        )
        lessons = result.scalars().all()
        return lessons


async def get_author(user_id: int):
    async with async_session() as session:
        result = await session.execute(select(User.user_name).where(User.id == user_id))
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
        )
        for c in conditions:
            count_query = count_query.where(c)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        query = (
            select(Lesson, User.user_name)
            .join(User, Lesson.author_id == User.id)
            .outerjoin(LessonTag, Lesson.id == LessonTag.lesson_id)
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
                    query = query.order_by(text(order))
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
            lessons_data.append(lesson_dict)

        return {"lessons": lessons_data, "total": total}

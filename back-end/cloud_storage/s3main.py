import cloudinary
import cloudinary.uploader
from fastapi import UploadFile
import os
from dotenv import load_dotenv
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
load_dotenv()
cloudinary.config( 
  cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
  api_key = os.getenv("CLOUDINARY_API_KEY"), 
  api_secret = os.getenv("CLOUDINARY_API_SECRET"),
  secure = True
)

async def upload_image_to_cloud(lesson_id: int, sheet_id: int, user_id: int, file: UploadFile, folder: str = "spark_lessons"):
    try:
        result = cloudinary.uploader.upload(
            file.file, 
            folder = folder,
            public_id = f"{user_id}/{sheet_id}",
            transformation = [
                {"quality": "auto"},
                {"fetch_format": "auto"}
            ]
        )
        image_url = result.get("secure_url")

        async with async_session() as session:
            res = await session.execute(select(Lesson).where(Lesson.id == lesson_id).where(Lesson.author_id == user_id))
            lesson = res.scalar_one_or_none()
            if lesson is None:
                raise HTTPException(status_code=404, detail="Lesson not found")
            await session.execute(
                update(LessonSheet)
                .where(LessonSheet.id == sheet_id)
                .values(picture_url=image_url, image_public_id=result.get("public_id"))
            )
            await session.commit()
            await session.refresh(lesson)
            return lesson

    except Exception as e:
        print(f"Ошибка Cloudinary: {e}")
        return None

async def delete_image_from_cloud():
    try:
        async with async_session() as session:
            result = await session.execute(
                select(LessonSheet.image_public_id)
                .where(LessonSheet.id == sheet_id)
            )
            image_public_id = result.scalar_one_or_none()
            if image_public_id:
                cloudinary.uploader.destroy(image_public_id)
                await session.execute(
                    update(LessonSheet)
                    .where(LessonSheet.id == sheet_id)
                    .values(picture_url=None, image_public_id=None)
                )
                await session.commit()
            return True
    except Exception as e:
        print(f"Ошибка Cloudinary: {e}")
        return False

async def delete_image_from_cloud_for_DB(public_id: str):
    try:
        cloudinary.uploader.destroy(public_id)
        return True
    except Exception as e:
        print(f"Ошибка Cloudinary: {e}")
        return False
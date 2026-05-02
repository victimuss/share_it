import pytest
from datetime import datetime, timedelta, timezone
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from fastapi.testclient import TestClient
from main import app
from databases.lesson_db.lessons_db_utils import new_lesson, get_lesson_by_id_for_edit, checker, new_sheet
from databases.schemas.schemas_lessons import LessonCreate, SheetCreate
from moto import mock_aws
import pytest_asyncio
from unittest.mock import AsyncMock, patch
from unittest.mock import patch
from databases.main_databases import engine

from core.s3_client import s3_storage
import boto3

@pytest_asyncio.fixture(autouse=True)
async def cleanup_db():
    yield
    await engine.dispose()

@pytest.mark.asyncio
async def test_checker_empty_lesson_failed():
    # Мок-лекция с нарушениями (оскорбления, незаконные действия),
    # чтобы LLM-модератор (Groq) вернул status: false
    import uuid
    from databases.users_db.users_db import User
    from databases.main_databases import async_session
    async with async_session() as session:
        user = User(user_name="test", email="[EMAIL_ADDRESS]", hashed_password="[PASSWORD]")
        session.add(user)
        await session.commit()
        await session.refresh(user)
    mock_lesson = {
        "lesson_name": f"Как взломать банк {uid}",
        "description": "Пошаговый туториал по краже денег. Все вокруг идиоты!",
        "type": "Code",
        "level": "Beginner"
    }
    lesson_data = LessonCreate(**mock_lesson)
    new_lesson_mock = await new_lesson(lesson_data=lesson_data, author_id=1)
    await checker(new_lesson_mock.id)
    
    from databases.main_databases import async_session
    from sqlalchemy import select
    from databases.lesson_db.lesson_db import Lesson
    
    # В тесте мы создаем только "пустой" урок (без листов LessonSheet).
    # Функция checker() видит, что листов нет, и возвращает:
    # {"status": False, "reason": "Урок пуст, нечего проверять"}
    # При этом статус в базе остается DRAFT (модерация не запускалась).
    async with async_session() as session:
        res = await session.execute(select(Lesson).where(Lesson.id == new_lesson_mock.id))
        updated_lesson = res.scalar()
        assert updated_lesson.status == "DRAFT", f"Expected 'DRAFT' for empty lesson, got {updated_lesson.status}"
        
@pytest.mark.asyncio
async def test_checker_lesson_failed():
    import uuid
    uid = uuid.uuid4().hex[:6]
    mock_lesson = {
        "lesson_name": f"Как взломать банк {uid}",
        "description": "Пошаговый туториал по краже денег. Все вокруг идиоты!",
        "type": "Code",
        "level": "Beginner"
    }
    mock_sheet = {
        "sheet_header": "Как взломать банк",
        "content": "Идиоты",
        "sheetType": "THEORY",
        "timeToRead": 1,
        "description_for_video_or_picture": None,
        "video_url": None,
        "picture_url": None,
        "question_text": None,
        "content_danger": None,
        "content_advice": None,
    }
    from databases.users_db.users_db import User
    from databases.main_databases import async_session
    async with async_session() as session:
        user = User(user_name="test1", email="[EMAIL_ADDRESS]1", hashed_password="[PASSWORD]")
        session.add(user)
        await session.commit()
        await session.refresh(user)
    lesson_data = LessonCreate(**mock_lesson)
    sheet_data = SheetCreate(**mock_sheet)
    new_lesson_mock = await new_lesson(lesson_data=lesson_data, author_id=1)
    new_sheet_mock = await new_sheet(sheet_data=sheet_data, author_id=1, lesson_id=new_lesson_mock.id )
    from unittest.mock import patch, AsyncMock
    import json
    
    # Имитируем ответ от LLM: нарушения найдены
    mock_groq_response = AsyncMock()
    mock_groq_response.choices = [
        AsyncMock(message=AsyncMock(content=json.dumps({"status": False, "reason": "Найдено насилие и незаконные действия"})))
    ]
    
    with patch("databases.lesson_db.lessons_db_utils.client.chat.completions.create", return_value=mock_groq_response):
        # Ждем завершения модерации
        checker_result = await checker(new_lesson_mock.id)
        print(f"Checker returned: {checker_result}")
    
    from databases.main_databases import async_session
    from sqlalchemy import select
    from databases.lesson_db.lesson_db import Lesson
    
    async with async_session() as session:
        res = await session.execute(select(Lesson).where(Lesson.id == new_lesson_mock.id))
        updated_lesson = res.scalar()
        assert updated_lesson.status == "REJECTED", f"Expected 'REJECTED' for lesson with bad content, got {updated_lesson.status}. Checker result: {checker_result}"


@pytest.mark.asyncio
async def test_s3_upload_success():
    bucket_name = "test-spark-bucket"
    file_key = "avatars/user_1.png"

    with patch.object(s3_storage, 'upload_file', new_callable=AsyncMock) as mock_upload:
        mock_upload.return_value = True
        result = await s3_storage.upload_file(
            local_path="любой_путь", 
            bucket_name=bucket_name, 
            object_name=file_key
        )

        assert result is True, "Функция должна вернуть True"
        
        mock_upload.assert_called_once_with(
            local_path="любой_путь", 
            bucket_name=bucket_name, 
            object_name=file_key
        )

    
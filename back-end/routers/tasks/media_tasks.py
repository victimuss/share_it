from celery import Celery
import os
import asyncio
from core.config import settings
from core.s3_client import s3_storage
from databases.main_databases import async_session
from sqlalchemy import update
from uuid import uuid4
from core.logging import logger
from databases.lesson_db.lesson_db import LessonSheet
from celery import shared_task

from core.celery_app import celery_app

@logger.catch
async def _async_upload_to_minio(file_path: str, sheet_id: int):
    file_name = os.path.basename(file_path)
    object_name = f"lessons/{sheet_id}/{file_name}"
    print('пытаюсь загрузить в бакет')
    try:
        image_url = await s3_storage.upload_file(file_path, object_name, settings.S3_BUCKET_NAME)

        async with async_session() as session:
            await session.execute(
                update(LessonSheet)
                .where(LessonSheet.id == sheet_id)
                .values(picture_url=image_url, image_public_id=object_name)
            )
            await session.commit()
            
    except Exception as e:
        logger.error(f"Ошибка при загрузке в MinIO: {e}, sheet_id: {sheet_id}")
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@celery_app.task(name='upload_to_minio')
@logger.catch
def upload_to_minio(file_path: str, sheet_id: int):
    asyncio.run(_async_upload_to_minio(file_path, sheet_id))

@celery_app.task(name='delete_from_minio')
@logger.catch
async def delete_from_minio(object_name: str):
    try:
        await s3_storage.delete_file(object_name, settings.S3_BUCKET_NAME)
    except Exception as e:
        logger.error(f"Ошибка при удалении из MinIO: {e}")
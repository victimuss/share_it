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

# @celery_app.task(name="add_user_notif_category")
# @logger.catch
# def add_user_notif(user_id: int, chat_id: int, category: str):
#     return asyncio.run(add_user_notif(user_id, chat_id))

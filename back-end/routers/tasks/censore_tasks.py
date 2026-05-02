import asyncio
from core.celery_app import celery_app
from databases.lesson_db.lessons_db_utils import checker
from core.logging import logger

@celery_app.task(name="checker_lesson")
@logger.catch
def checker_lesson(lesson_id: int):
    return asyncio.run(checker(lesson_id))

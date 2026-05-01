import asyncio
from core.celery_app import celery_app
from databases.lesson_db.lessons_db_utils import checker

@celery_app.task(name="checker_lesson")
def checker_lesson(lesson_id: int):
    return asyncio.run(checker(lesson_id))

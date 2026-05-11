import asyncio
from core.celery_app import celery_app
from databases.lesson_db.lessons_db_utils import checker
from core.logging import logger
import json
from sqlalchemy import select, delete
from groq import AsyncGroq
import groq 
from core.config import settings
from databases.lesson_db.lesson_db import Lesson, LessonSheet, LessonTag
from databases.schemas.schemas_lessons import GroqResponseSchema
from databases.main_databases import async_session
from databases.lesson_db.lesson_db import RegistedUsers
from databases.users_db.users_db import UserLesson

client = AsyncGroq(api_key=settings.GROQ_API_KEY)
def build_grok_prompt(lesson_prompt: str, difficulty: str, lesson_type: str, language: str = 'en') -> str:
    return f"""You are an expert educational instructional designer for the 'Spark Edu' platform. 
    Your task is to generate a highly structured, accurate lesson based strictly on the provided parameters.

    PARAMETERS:
    - Topic/Request: {lesson_prompt}
    - Difficulty Level: {difficulty}
    - Lesson Type: {lesson_type}
    - Language: {language}

    RULES & CONSTRAINTS:
    1. STRICT JSON ONLY: You MUST respond ONLY with valid JSON. No markdown blocks, no extra text.
    2. PAGES (SHEETS): Generate a MINIMUM of 5 and a MAXIMUM of 15 sheets. Mix sheet types to keep it engaging.
    3. SHEET TYPES & CONDITIONS: 'sheetType' MUST BE EXACTLY ONE OF THESE FOUR: "THEORY", "PICTURE", "QUIZ", or "VIDEO".
    - If "THEORY": 'content' MUST be provided (cannot be null).
    - If "PICTURE": 'picture_url' MUST be provided. Use dynamic sources like "https://loremflickr.com/800/600/keyword1,keyword2".
    - If "VIDEO": 'video_url' (YouTube ONLY) and 'description_for_video_or_picture' MUST BOTH be provided.
    - If "QUIZ": 'quiz' object MUST be provided. It must have a 'question_text' and a 'quiz_options' array with at least 2 options (exactly one must have "is_correct": true).
    4. STRICT CHARACTER LIMITS:
    - 'content': Maximum 500 characters (about 3-4 short sentences).
    - 'content_advice': Maximum 75 characters (one short tip).
    - 'content_danger': Maximum 75 characters (one short warning).
    - 'sheet_header': Maximum 50 characters (short title).
    - 'description_for_video_or_picture': Maximum 50 characters.
    - 'quiz.question_text': Maximum 30 characters (very brief question).

    JSON SCHEMA:
    {{
    "lesson": {{
        "lesson_meta": {{
        "lesson_name": "String",
        "description": "String"
        }},
        "sheets": [
        {{
            "sheet_header": "String (Max 50 chars)",
            "sheetType": "String (THEORY | PICTURE | QUIZ | VIDEO)",
            "content": "String (Max 500 chars) or null",
            "content_advice": "String (Max 75 chars) or null",
            "content_danger": "String (Max 75 chars) or null",
            "quiz": {{
            "question_text": "String (Max 30 chars)",
            "quiz_options": [
                {{"option": "String", "is_correct": true}},
                {{"option": "String", "is_correct": false}}
            ]
            }} or null,
            "picture_url": "String or null",
            "video_url": "String or null",
            "description_for_video_or_picture": "String (Max 50 chars) or null"
        }}
        ],
        "tags": ["tag1", "tag2", "tag3"]
    }}
    }}
    """


async def _create_lesson_async(lesson_prompt: str, difficulty: str, lesson_type: str, user_id: int, language: str = 'en') -> dict:
    try:
        system_prompt = build_grok_prompt(lesson_prompt, difficulty, lesson_type, language)
        response = await client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": f"Create a lesson about: {lesson_prompt}"
                }
            ],
            response_format={"type": "json_object"}, 
            temperature=0.1,                         
            max_tokens=6000                         
        )

        raw_content = response.choices[0].message.content
        ai_data = GroqResponseSchema.model_validate_json(raw_content)
        async with async_session() as session:
            new_lesson=Lesson(
                lesson_name=ai_data.lesson.lesson_meta.lesson_name,
                description=ai_data.lesson.lesson_meta.description,
                type=lesson_type,
                level=difficulty,
                author_id=909090,
                ai_generated=True,
            )
            session.add(new_lesson)
            await session.flush()
            lesson_id = new_lesson.id
            sheets_to_add = []
            for sheet in ai_data.lesson.sheets:
                quiz_dump = sheet.quiz.model_dump() if sheet.quiz else {}
                new_sheet = LessonSheet(
                    content_id=lesson_id,
                    sheet_header=sheet.sheet_header,
                    sheetType=sheet.sheetType,
                    content=sheet.content if sheet.content is not None else "",
                    author_id=909090,
                    content_advice=sheet.content_advice,
                    content_danger=sheet.content_danger,
                    question_text=quiz_dump.get("question_text"), 
                    quiz_options=quiz_dump.get("quiz_options"),
                    picture_url=sheet.picture_url,
                    video_url=sheet.video_url,
                    description_for_video_or_picture=sheet.description_for_video_or_picture
                )
                sheets_to_add.append(new_sheet)
            session.add_all(sheets_to_add)
            for tag_name in ai_data.lesson.tags:
                tag = LessonTag(lesson_id=lesson_id, tag=tag_name.lower())
                session.add(tag)
            await session.commit()
            check_result = await checker(lesson_id)
            is_safe = check_result.get("status")
            if is_safe is True:
                reg_user = RegistedUsers(user_id=user_id, lesson_id=lesson_id)
                user_lesson = UserLesson(
                    user_id=user_id, 
                    lesson_id=lesson_id, 
                    completed_steps=0, 
                    status='IN_PROGRESS'
                )
                session.add_all([reg_user, user_lesson])
                await session.commit()
                return {"status": "success", "lesson_id": lesson_id}
            if is_safe is False:
                await delete_session.execute(
                    delete(LessonSheet).where(LessonSheet.lesson_id == lesson_id)
                )
                await delete_session.commit()
                return {
                        "status": "failed_moderation", 
                        "reason": check_result.get("reason", "Unknown moderation failure")
                    }
    except groq.RateLimitError as e:
        logger.warning(f"Лимит Groq исчерпан. Передаем управление Celery для ретрая...")
        raise e
    except json.JSONDecodeError as e:
        logger.error(f"Ошибка парсинга JSON от Groq: {e}")
        return {"error": "Failed to parse AI response into JSON"}
    except Exception as e:
        logger.error(f"Ошибка при создании урока: {e}")
        return {"error": str(e)}

@celery_app.task(name="create_lesson",
autoretry_for=(groq.RateLimitError,),
retry_backoff=2,
max_retries=10,
retry_backoff_max=360,
retry_jitter=True
)
@logger.catch
def create_lesson(lesson_prompt: str, difficulty: str, lesson_type: str, user_id: int, language: str = 'en') -> dict:
    return asyncio.run(_create_lesson_async(lesson_prompt, difficulty, lesson_type, user_id, language))

if __name__ == "__main__":
    result = asyncio.run(_create_lesson_async("HTML", "beginner", "Code", 102, "ru"))

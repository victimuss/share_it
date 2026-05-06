from fastapi import FastAPI, HTTPException                                                      
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import timezone, datetime
from pydantic import BaseModel
from typing import Optional
import requests
from pydantic import BaseModel
from auth.jwt_tokens import *
from databases.users_db.user_db_utils import add_user, authenticate_user, set_progress, set_lession
from databases.users_db.users_db import User
from databases.lesson_db.lessons_db_utils import *
from routers.user_router import router as user_router
from routers.main_page_router import router as main_page_router
from routers.lesson_router import router as lesson_router
from fastapi import Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from routers.auth_router import router as auth_router
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from contextlib import asynccontextmanager
from core.redis_config import redis_client
from core.config import settings
import sentry_sdk
from core.authentication_backend import authentication_backend
from sqladmin import Admin, ModelView
from starlette.middleware.sessions import SessionMiddleware
from databases.main_databases import engine
from core.exceptions import SparkException
from fastapi.responses import JSONResponse

limiter = Limiter(key_func=get_remote_address, default_limits=["100/minute"])
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = redis_client
    yield


sentry_sdk.init(
    dsn=settings.SENTRY_DNS,
    send_default_pii=True,
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
)

app = FastAPI(
    title="Spark ❇️ API",
    description="Backend API для образовательной P2P-платформы Spark. Zero-bullshit, только знания.",
    version="1.0.0",
    contact={
        "name": "Timur",
        "url": "https://t.me/spark_app_edu",
    },
    lifespan=lifespan
)
app.include_router(user_router)
app.include_router(main_page_router)
app.include_router(lesson_router)
app.include_router(auth_router)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(SessionMiddleware, secret_key=settings.ADMIN_SECRET_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://192.168.88.163:8082",  # ← Твой локальный IP
        "exp://192.168.88.163:8082", "*"],  # Порт фронтенда
    allow_credentials=False,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Разрешаем все заголовки
    expose_headers=["*"]
)

@app.exception_handler(SparkException)
async def spark_exception_handler(request: Request, exc: SparkException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": exc.code,
                "message": exc.message
            }
        }
    )

@app.exception_handler(Exception)
async def universal_exception_handler(request: Request, exc: Exception):
    sentry_sdk.capture_exception(exc)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "Internal server error"
            }
        }
    )

admin = Admin(app, engine,
authentication_backend=authentication_backend)
class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.user_name, User.email, User.public_key]
    column_searchable_list = [User.user_name, User.email, User.public_key]
    icon = "fa-solid fa-user"

class LessonAdmin(ModelView, model=Lesson):
    column_list = [Lesson.id, Lesson.lesson_name, Lesson.status, Lesson.level, Lesson.type]
    column_searchable_list = [Lesson.status, Lesson.level, Lesson.type]
    icon = "fa-solid fa-book"

admin.add_view(UserAdmin)
admin.add_view(LessonAdmin)

if __name__ == "__main__":
    uvicorn.run('main:app', host='0.0.0.0', port = 8000, reload = True)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/sentry-debug")
async def trigger_error():
    raise ValueError("Test Error")

@app.on_event("startup")
async def startup_event():
    print("""
\033[95m
  ___  ___  _   ___ _  __
 / __|| _ \/ \ | _ \ |/ /
 \__ \|  _/ _ \|   / ' < 
 |___/|_|/_/ \_\_|_\_|\_\
\033[0m
🚀 SPARK Backend is running...
    """)

@app.middleware("http")
async def add_custom_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Powered-By"] = "Timur & Coffee (SPARK P2P)"
    response.headers["X-Mission"] = "Education for everyone"
    return response
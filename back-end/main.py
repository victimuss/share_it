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
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
limiter = Limiter(key_func=get_remote_address, default_limits=["100/minute"])
app = FastAPI(
    title="Spark ❇️ API",
    description="Backend API для образовательной P2P-платформы Spark. Zero-bullshit, только знания.",
    version="1.0.0",
    contact={
        "name": "Timur",
        "url": "https://t.me/spark_app_edu",
    }
)
app.include_router(user_router)
app.include_router(main_page_router)
app.include_router(lesson_router)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://192.168.88.163:8082",  # ← Твой локальный IP
        "exp://192.168.88.163:8082", "*"],  # Порт фронтенда
    allow_credentials=False,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Разрешаем все заголовки
    expose_headers=["*"]
)

if __name__ == "__main__":
    uvicorn.run('main:app', host='0.0.0.0', port = 8000, reload = True)

@app.get("/")
async def root():
    return {"message": "Hello World"}

    
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
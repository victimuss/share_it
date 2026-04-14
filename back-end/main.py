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
from databases.main_databases import create_all_tables
from end_points.users_end_points.UEP import router as user_router
from end_points.main_page_end_points.MPEP import router as main_page_router
from end_points.lessons_end_points.LEP import router as lesson_router

app = FastAPI()
app.include_router(user_router)
app.include_router(main_page_router)
app.include_router(lesson_router)


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

@app.on_event("startup")
async def startup_event():
    await create_all_tables()
    print("Все таблицы загружены!")

@app.get("/")
async def root():
    return {"message": "Hello World"}
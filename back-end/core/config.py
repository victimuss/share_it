from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # Основные настройки
    PROJECT_NAME: str = "Spark Edu API"
    VERSION: str = "1.0.0"
    
    # База данных
    DATABASE_URL: str = ""
    DB_USER: str = "admin"
    DB_PASS: str = "root"      
    DB_HOST: str = "127.0.0.1"
    DB_NAME: str = "my_project"         
    BACKUP_DIR: str = "E:/backups"    
    DAYS_TO_KEEP: int = 7           

    #Redis
    REDIS_URL: str = ""

    #RabbitMQ
    CELERY_BROKER_URL: str = ""


    # Секреты для JWT. 
    # Ставим значения по умолчанию, чтобы Pydantic не ругался, если их нет в .env
    SECRET_KEY: str = "default_secret_key_change_it"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Google Censore и S3
    # Используем Optional или пустые строки по умолчанию
    S3_ENDPOINT: str = ""
    S3_ACCESS_KEY: str = ""
    S3_SECRET_KEY: str = ""
    S3_BUCKET_NAME: str = ""
    
    # URL для фронтенда
    S3_PUBLIC_URL: str = "http://minio:9000/lessons-media"

    # ZKP
    P_KEY: str = ""
    G_KEY: str = ""
    NONCE_EXPIRE: int = 60

    #Sentry
    SENTRY_DNS: str = ""

    #Telegram
    BOT_TOKEN: str = ""

    #Admin
    ADMIN_SECRET_KEY: str = ""
    ADMIN_SECRET_KEY_HASH: str = ""
    
    # Дополнительные API ключи
    GROQ_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # Pydantic сам прочитает .env и подставит значения в поля выше по именам
    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8", 
        extra="ignore"
    )

# Создаем экземпляр настроек
settings = Settings()
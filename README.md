# Spark ❇️ – AI-Powered Education Platform

![Status](https://img.shields.io/badge/Status-Active_Development-green)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Database](https://img.shields.io/badge/DB-PostgreSQL-336791)
![TaskQueue](https://img.shields.io/badge/Queue-RabbitMQ%20%7C%20Celery-FF6600)
![Storage](https://img.shields.io/badge/Storage-MinIO%20(S3)-C7202C)

**SPARK** — это образовательная платформа нового поколения, где искусственный интеллект помогает структурировать знания, а пользователи делятся ими в формате микрообучения. Проект построен на современной распределенной архитектуре, обеспечивающей высокую отказоустойчивость и масштабируемость.

[🔗 Следить за разработкой в Telegram](https://t.me/spark_app_edu)

---

## 🚀 Обновление архитектуры (Spark 2.0)
Проект перешел от монолитной структуры к распределенной системе. Внедрение брокеров сообщений и фоновых задач позволило разгрузить API, сделав загрузку медиа и работу с ИИ-моделями асинхронной и независимой от клиентских запросов.

## 🛠 Технологический стек

### **Backend & Infrastructure:**
* **Framework:** FastAPI (Асинхронная архитектура).
* **Task Queue:** Celery + RabbitMQ (Асинхронная обработка медиа, модерация контента и тяжелые ИИ-задачи).
* **Databases & Cache:** PostgreSQL (основная БД), Redis (кэширование и Celery Backend), Alembic (управление миграциями).
* **Media Storage:** MinIO (Собственное S3-совместимое объектное хранилище).
* **AI Core:** Интеграция с **Gemini Pro** и **Groq (Llama 3)** для интеллектуального анализа контента.
* **DevOps:** Docker & Docker Compose (Полная контейнеризация всей инфраструктуры).

### **Mobile (Frontend):**
* **Framework:** React Native.
* **State Management:** Zustand (Легковесный и быстрый стор).
* **Networking:** Axios.

---

## 🔑 Доступ к Demo (Android)
Регистрация новых пользователей временно ограничена. Используйте гостевой доступ для тестирования функционала:

* **Login:** `guess@example.com`
* **Password:** `123`

---

## 🗓 Дорожная карта (Roadmap)
- [x] Интеграция ИИ-ассистентов (Gemini/Groq).
- [x] Переход на микросервисную архитектуру (внедрение Celery, RabbitMQ, Redis).
- [x] Миграция с SQLite на PostgreSQL + Alembic.
- [x] Переход на собственное S3-совместимое хранилище (MinIO).
- [x] Настройка централизованного логирования (Logging).
- [x] Покрытие бизнес-логики и воркеров тестами (Pytest).
- [ ] Переход на Telegram Auth (авторизация без хранения паролей).
- [x] Настройка CI/CD пайплайнов.

---

## 🛠 Локальная разработка

Проект полностью контейнеризирован. Для запуска всей инфраструктуры (API, Postgres, Redis, RabbitMQ, MinIO, Celery Workers) достаточно одной команды.

1. Клонируйте репозиторий:
   ```bash
   git clone [https://github.com/victimuss/spark_edu.git](https://github.com/victimuss/spark_edu.git)
   cd spark-backend
   ```
2. Запустите инфраструктуру через Docker Compose:
   ```bash
   docker-compose up --build -d
   ```

   

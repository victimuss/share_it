# Spark ❇️ – AI-Powered Education Platform

![Status](https://img.shields.io/badge/Status-Active_Development-green)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Security](https://img.shields.io/badge/Security-ZKP_Auth-8A2BE2)
![Database](https://img.shields.io/badge/DB-PostgreSQL-336791)
![TaskQueue](https://img.shields.io/badge/Queue-RabbitMQ%20%7C%20Celery-FF6600)
![Storage](https://img.shields.io/badge/Storage-MinIO%20(S3)-C7202C)

**SPARK** — это образовательная платформа нового поколения, где искусственный интеллект помогает структурировать знания, а пользователи делятся ими в формате микрообучения. Проект построен на современной распределенной архитектуре, обеспечивающей высокую отказоустойчивость, масштабируемость и **максимальный (Trustless) уровень приватности**.

[🔗 Следить за разработкой в Telegram](https://t.me/spark_app_edu)

---

## 🚀 Обновление архитектуры
* **Распределенная система:** Внедрение брокеров сообщений и фоновых задач (Celery + RabbitMQ) позволило разгрузить API, сделав загрузку медиа и работу с ИИ-моделями асинхронной.
* **Trustless Privacy (ZKP):** Полный отказ от хранения паролей, email и любых персональных данных (ПДн). Регистрация и авторизация происходят через Telegram-бота с использованием криптографических доказательств с нулевым разглашением (Zero-Knowledge Proofs) и сид-фраз стандарта BIP-39.

## 🛠 Технологический стек

### **Backend & Infrastructure:**
* **Framework:** FastAPI (Асинхронная архитектура).
* **Security & Identity:** aiogram 3.x (Telegram-бот как интерфейс генерации ключей), ZKP (Протокол Шнорра), BIP-39 (Mnemonic фразы).
* **Task Queue:** Celery + RabbitMQ (Асинхронная обработка медиа, модерация контента и тяжелые ИИ-задачи).
* **Databases & Cache:** PostgreSQL (основная БД для бизнес-логики и публичных ключей ZKP), Redis (кэширование, Celery Backend и хранение временных ZKP-вызовов), Alembic (управление миграциями).
* **Media Storage:** MinIO (Собственное S3-совместимое объектное хранилище).
* **AI Core:** Интеграция с **Gemini Pro** и **Groq (Llama 3)** для интеллектуального анализа контента.
* **DevOps:** Docker & Docker Compose (Полная контейнеризация всей инфраструктуры).

### **Mobile (Frontend):**
* **Framework:** React Native.
* **State Management:** Zustand (Легковесный и быстрый стор).
* **Networking:** Axios.

---

## 🔑 Доступ к Demo (Android)
В связи с переходом на криптографическую ZKP-авторизацию, классические логины и пароли полностью удалены из системы. В нашей базе данных не хранятся ваши личные данные.

Для гостевого тестирования приложения используйте следующую связку (аналог входа в криптокошелек):

* **ID аккаунта:** `1`
* **Сид-фраза (Секрет):** `apple orbit cloud river stone forest light echo alpha brave charlie delta` 
*(Примечание: Сервер проверяет математическое доказательство на основе этих 12 слов, но сама фраза никогда не передается по сети и не хранится в нашей БД).*

Для создания собственного полностью анонимного аккаунта запустите нашего [Telegram-бота](#) (https://t.me/assist_me_please_P_bot).

---

## 🗓 Дорожная карта (Roadmap)
- [x] Интеграция ИИ-ассистентов (Gemini/Groq).
- [x] Переход на микросервисную архитектуру (внедрение Celery, RabbitMQ, Redis).
- [x] Миграция с SQLite на PostgreSQL + Alembic.
- [x] Переход на собственное S3-совместимое хранилище (MinIO).
- [ ] Переход на Zero-Knowledge Proof авторизацию через Telegram бота (авторизация без хранения паролей).
- [x] Настройка централизованного логирования (Logging).
- [x] Покрытие бизнес-логики и воркеров тестами (Pytest).
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

   

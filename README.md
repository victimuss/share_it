# Spark ❇️ – AI-Powered Education Platform

![Status](https://img.shields.io/badge/Status-Demo--Release-green)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Database](https://img.shields.io/badge/DB-SQLite-003B57)
![AI](https://img.shields.io/badge/AI-Gemini%20%7C%20Groq-blue)
![Platform](https://img.shields.io/badge/Platform-Android-lightgrey)

**SPARK** — это образовательная платформа нового поколения, где искусственный интеллект помогает структурировать знания, а пользователи делятся ими в формате микрообучения. Проект адаптирован для работы в условиях ограниченных ресурсов и строгих требований к приватности.

[🔗 Следить за разработкой в Telegram](https://t.me/spark_app_edu)

---

## 🚀 Текущие реалии (Privacy-First)
В связи с изменениями в законодательстве (152-ФЗ) и требованиями к локализации данных, архитектура проекта была пересмотрена:
* **Анонимный доступ:** Демо-версия работает через единый гостевой аккаунт. Это позволяет тестировать функционал, не передавая персональные данные на сервер.
* **Extreme Optimization:** Бэкенд оптимизирован для работы на сверхбюджетных VPS (1 vCPU, 1GB RAM).

## 🛠 Технологический стек

### **Backend:**
* **Framework:** FastAPI (Асинхронная архитектура).
* **AI Core:** Интеграция с **Gemini 1.5 Pro** и **Groq (Llama 3)** для интеллектуального анализа контента.
* **Database:** SQLite (Оптимизированный выбор для экономии RAM на микро-серверах).
* **Media Storage:** Cloudinary API (Раздача медиа через CDN).
* **Infrastructure:** Docker + Docker Volumes (Обеспечение персистентности данных).

### **Mobile (Frontend):**
* **Framework:** React Native.
* **State Management:** Zustand (Легковесный и быстрый).
* **Networking:** Axios.

---

## 🔑 Доступ к Demo (Android)
Регистрация новых пользователей временно приостановлена для соблюдения норм приватности. Используйте общий доступ:

* **Login:** `spark_guest`
* **Password:** `spark2026`

---

## 🗓 Дорожная карта (Roadmap)
- [x] Интеграция ИИ-ассистентов (Gemini/Groq).
- [x] Оптимизация под Low-end серверы (VPS Black).
- [x] Контейнеризация и деплой через Docker.
- [x] Настройка персистентных хранилищ (Docker Volumes) для БД.
- [ ] **Next Step:** Переход на Telegram Auth (авторизация без хранения паролей).
- [ ] **Next Step:** Переход на S3-совместимое хранилище в юрисдикции РФ.

---

## 🛠 Локальная разработка
1. Клонируйте репозиторий:
   ```bash
   git clone [https://github.com/ВАШ_ЮЗЕРНЕЙМ/spark-backend.git](https://github.com/ВАШ_ЮЗЕРНЕЙМ/spark-backend.git)
   cd spark-backend

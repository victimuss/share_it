# Spark ❇️ – AI-Powered Trustless Education Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React Native](https://img.shields.io/badge/Frontend-React_Native-61DAFB.svg?style=flat&logo=react&logoColor=black)](https://reactnative.dev/)
[![ZKP](https://img.shields.io/badge/Security-Zero--Knowledge_Proofs-blueviolet.svg)](https://en.wikipedia.org/wiki/Zero-knowledge_proof)

**🌐 Official Website:** [spark-edu.ru](https://spark-edu.ru)

**Spark** is a next-generation micro-learning platform designed for the era of AI and total privacy. It combines intelligent content structuring with a **Trustless Architecture**, ensuring that users own their data without compromise.

> **📢 Acquisition Notice:** Spark is a fully completed, production-ready MVP. The project, including all intellectual property and source code, is currently available for acquisition.

## 💎 Core Value Propositions

* **🔒 Trustless Privacy (ZKP):** No passwords, no emails, no PII (Personally Identifiable Information). Identity is managed via **Schnorr Protocol Zero-Knowledge Proofs** and **BIP-39 Mnemonic phrases**.
* **🤖 AI-Native Infrastructure:** Integrated **Gemini Pro**, **OpenAI**, and **Groq** engines for high-speed automated content generation and structured knowledge synthesis directly from voice prompts.
* **🌍 Multi-tenant & Scalable:** A distributed microservice architecture built with **FastAPI**, **Celery**, and **RabbitMQ** for asynchronous task processing.
* **📱 Offline-First Mobile Experience:** A high-performance **React Native** client utilizing **Zustand** and **MMKV** for state management and robust caching for seamless learning anywhere.

## 🛠 Tech Stack

**Backend & Infrastructure**
* **Framework:** FastAPI (High-performance asynchronous Python).
* **Identity & Security:** BIP-39 Mnemonic generation via Telegram Bot, ECC-based Schnorr ZKP authentication.
* **Task Orchestration:** Celery + RabbitMQ (Media processing, AI inference).
* **Storage:** PostgreSQL (Business logic), Redis (Cache & ZKP Challenges), MinIO (S3-compatible object storage).
* **DevOps:** Docker & Docker Compose (One-command deployment), Alembic (DB Migrations).

**Mobile Client**
* **Framework:** React Native / Expo.
* **State & Storage:** Zustand (Lightweight store) + MMKV.
* **Networking:** Axios with custom interceptors for ZKP-auth headers.
* **Theming:** Dynamic design tokens (Dark/Light mode support).

## 🚀 Architectural Highlights

**Schnorr ZKP Authentication**
Unlike traditional platforms, Spark never sees your password. The login process uses a non-interactive zero-knowledge proof:
1. Client generates a cryptographic commitment.
2. Server issues a challenge.
3. Client provides a proof that it knows the secret key (derived from BIP-39 words) without revealing it.

## 🏁 Project Status (100% Completed)

All development phases have been successfully executed. Spark stands as a fully operational system ready for global deployment:
* **✅ Core Architecture:** Stable microservices (FastAPI, Celery, Redis) with S3 integration.
* **✅ Security:** Hardened ECC-based ZKP implementation and seamless Telegram-based Identity Provider.
* **✅ Mobile Client:** Polished UI/UX with Reanimated 3, fully localized (RU/EN/ES/ZH), and offline-first capabilities.
* **✅ AI Integration:** Instant voice-to-text and automated flashcard generation.

## 🔑 Demo, Previews & Website

To see Spark in action or learn more, visit our official resources:

* **🌐 Official Website:** [spark-edu.ru](https://spark-edu.ru)
* **👉 Telegram Channel:** [t.me/spark_app_edu](https://t.me/spark_app_edu) — Watch video demonstrations, architecture breakdowns, and UI previews.

## 🛠 Local Development

The entire infrastructure is containerized. A potential buyer or developer can launch the full environment (API, Workers, DB, S3) in minutes:

```bash
git clone [https://github.com/victimuss/spark_edu.git](https://github.com/victimuss/spark_edu.git)
cd spark_edu
docker-compose up --build -d

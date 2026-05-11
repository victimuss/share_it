# Spark ❇️ – AI-Powered Trustless Education Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React Native](https://img.shields.io/badge/Frontend-React_Native-61DAFB.svg?style=flat&logo=react&logoColor=black)](https://reactnative.dev/)
[![ZKP](https://img.shields.io/badge/Security-Zero--Knowledge_Proofs-blueviolet.svg)](https://en.wikipedia.org/wiki/Zero-knowledge_proof)

**Spark** is a next-generation micro-learning platform designed for the era of AI and total privacy. It combines intelligent content structuring with a **Trustless Architecture**, ensuring that users own their data without compromise.

---

## 💎 Core Value Propositions

* **🔒 Trustless Privacy (ZKP):** No passwords, no emails, no PII (Personally Identifiable Information). Identity is managed via **Schnorr Protocol Zero-Knowledge Proofs** and **BIP-39 Mnemonic phrases**. 
* **🤖 AI-Native Infrastructure:** Integrated **Gemini Pro** and **Groq (Llama 3)** engines for automated content generation and structured knowledge synthesis.
* **🌍 Multi-tenant & Scalable:** A distributed microservice architecture built with **FastAPI**, **Celery**, and **RabbitMQ** for asynchronous task processing.
* **📱 Offline-First Mobile Experience:** A high-performance **React Native** client utilizing **Zustand** for state management and robust caching for seamless learning anywhere.

---

## 🛠 Tech Stack

### Backend & Infrastructure
- **Framework:** FastAPI (High-performance asynchronous Python).
- **Identity & Security:** BIP-39 Mnemonic generation via Telegram Bot, ECC-based Schnorr ZKP authentication.
- **Task Orchestration:** Celery + RabbitMQ (Media processing, AI inference, and content moderation).
- **Storage:** PostgreSQL (Business logic), Redis (Cache & ZKP Challenges), MinIO (S3-compatible object storage).
- **DevOps:** Docker & Docker Compose (One-command deployment), Alembic (DB Migrations).

### Mobile Client
- **Framework:** React Native.
- **State:** Zustand (Lightweight store).
- **Networking:** Axios with custom interceptors for ZKP-auth headers.
- **Theming:** Dynamic design tokens (Dark/Light mode support).

---

## 🚀 Architectural Highlights

### Schnorr ZKP Authentication
Unlike traditional platforms, Spark never sees your password. The login process uses a non-interactive zero-knowledge proof:
1. Client generates a cryptographic commitment.
2. Server issues a challenge.
3. Client provides a proof that it knows the secret key (derived from BIP-39 words) without revealing it.

### Edge NLP Moderation
To minimize external API costs and legal risks, Spark uses quantized **Local BERT models** for real-time content moderation directly on the infrastructure, ensuring 100% data sovereignty.

---

## 🗓 Roadmap

### ✅ Phase 1: Foundation (Completed)
- Microservice architecture setup (FastAPI, Celery, Redis).
- S3 Storage integration (MinIO).
- Core AI integration for card generation.
- Automated testing suite (Pytest).

### ⏳ Phase 2: Security & Privacy (In Progress)
- [ ] Hardened ECC-based ZKP implementation.
- [ ] Telegram-based Identity Provider (Bot).
- [ ] Real-time monitoring with Sentry.

### 🔭 Phase 3: Global Scale (Next Steps)
- [ ] Multilingual support (RU/EN/ES/ZH) using `i18next`.
- [ ] Advanced UI/UX with `Reanimated 3`.
- [ ] Enterprise-grade backup & disaster recovery system.

---

## 🔑 Demo Access (Preview)

Experience the privacy-first approach without creating an account:

1. **Download the Android Build** (Link in Telegram)
2. **Identity ID:** `1`
3. **Secret Seed (BIP-39):** `apple orbit cloud river stone forest light echo alpha brave charlie delta`

> *Note: The server verifies the mathematical proof. The seed phrase is never transmitted over the network.*

---

## 🛠 Local Development

The entire infrastructure is containerized. Launch the full environment (API, Workers, DB, S3) with:

```bash
git clone [https://github.com/victimuss/spark_edu.git](https://github.com/victimuss/spark_edu.git)
cd spark_edu
docker-compose up --build -d

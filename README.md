# footballStats

A backend-first football statistics REST API platform that continuously ingests match data, stores and processes statistical metrics in PostgreSQL, accelerates query throughput via Redis caching, and serves machine-learning player similarity vectors.
Aim to make a fully deployed ,user tailored version of FotMob, SofaScore and to showcase machine learning skills in two passions of mine.

## Key Features & Architecture
- **Raw SQL Data Layer:** PostgreSQL schema with explicit migrations and zero ORM abstractions.
- **In-Memory Caching:** Redis caching layer designed for high-frequency stats queries with response latency metrics documented.
- **Security:** JWT authentication featuring stateless access tokens and secure refresh token rotation.
- **Automated Ingestion:** Scheduled background worker running isolated from the main HTTP API server.
- **ML Engine:** Cosine similarity calculation on player statistical vectors for dynamic profile matching.

## Tech Stack
- **Runtime & API:** Node.js, Express
- **Database:** PostgreSQL (Raw SQL Migrations)
- **Cache:** Redis
- **Auth:** JWT (Access & Refresh Token Rotation)
- **Containerisation & CI/CD:** Docker, GitHub Actions
- **Documentation:** Swagger / OpenAPI 3.0
- **Data Source:** API-Football / football-data.org API

## Target REST Endpoints (Core Contracts)

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`

### Statistics & Entities
- `GET /api/v1/matches`
- `GET /api/v1/matches/:id`
- `GET /api/v1/teams/:id/history`
- `GET /api/v1/players/:id/stats`

### Favourites (JWT Protected)
- `GET /api/v1/favourites`
- `POST /api/v1/favourites`
- `DELETE /api/v1/favourites/:id`

### Analytics
- `GET /api/v1/players/:id/similar`

## Project Status
In Active Development — Core Architecture & Database Migration Phase.
Currently creating SQL database schemeas.

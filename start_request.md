

---

# Project Specification: Python Smart LMS (Py-SMS)

## 1. Role & Objective

Act as a **Senior Python Backend Engineer**. You are tasked to build a scalable Student Management System (LMS) called **"Py-SMS"**. The system requires a RESTful API backend that supports Web/App clients, handles heavy data analytics (grades), and integrates AI features (attendance).

## 2. Tech Stack & Constraints

You must strictly follow these library versions and conventions:

### Core Framework

* **Language:** Python 3.11+
* **Web Framework:** `FastAPI` (Async enabled)
* **Server:** `Uvicorn`
* **Container:** `Docker` & `Docker Compose`

### Database & ORM

* **DB:** `PostgreSQL` (Use `psycopg2-binary` driver)
* **ORM:** `SQLAlchemy 2.0+` (Use modern syntax: `Mapped`, `mapped_column`)
* **Migration:** `Alembic`
* **Validation:** `Pydantic V2` (Use `BaseModel`, `Field`)

### Data Analytics & Async Tasks

* **Data Processing:** `Pandas`, `Numpy` (For grade statistics, standard deviation, Z-score)
* **Visualization:** `Matplotlib`, `Seaborn` (For generating static graph images)
* **PDF Generation:** `ReportLab`
* **Async Queue:** `Celery` + `Redis` (Broker)

### AI & Computer Vision

* **Vision:** `opencv-python`, `face_recognition`, `dlib`
* **Utilities:** `qrcode`

---

## 3. Implementation Roadmap (Step-by-Step Instructions)

**IMPORTANT:** Follow this order strictly. Do not generate code for later phases until instructed.

### Phase 0: Project Structure & Initialization (EXECUTE FIRST)

**Goal:** Create a clean, modular directory structure suitable for a scalable FastAPI application.
**Action:** Run shell commands (`mkdir`, `touch`) to create the following structure immediately.

```text
Py-SMS/
├── app/
│   ├── __init__.py
│   ├── main.py              # App entry point (FastAPI app instance)
│   ├── api/                 # API Routes (Endpoints)
│   │   ├── __init__.py
│   │   └── v1/              # Versioning
│   │       ├── __init__.py
│   │       └── endpoints/   # auth.py, students.py, grades.py
│   ├── core/                # Config, Security, Exceptions
│   │   ├── __init__.py
│   │   ├── config.py        # Settings (Pydantic BaseSettings)
│   │   └── security.py      # JWT logic
│   ├── db/                  # Database connectivity
│   │   ├── __init__.py
│   │   ├── session.py       # Engine & SessionLocal
│   │   └── base.py          # SQLAlchemy Base
│   ├── models/              # SQLAlchemy Tables (DB Schema)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── student.py
│   │   └── grade.py
│   ├── schemas/             # Pydantic Models (Request/Response)
│   │   ├── __init__.py
│   │   └── ...
│   └── services/            # Business Logic & Analytics (Pandas/AI)
│       ├── __init__.py
│       ├── analytics.py     # Grade processing
│       └── attendance.py    # Face recognition logic
├── tests/                   # Pytest
├── .env                     # Environment variables
├── .gitignore
├── requirements.txt
└── docker-compose.yml

```

### Phase 1: Infrastructure & Auth (Setup)

1. **Dependencies:** Populate `requirements.txt` with all necessary libraries mentioned in the Tech Stack.
2. **Config:** Setup `app/core/config.py` to read from `.env`.
3. **Database:** Implement `app/db/session.py` and set up Alembic for migrations.
4. **Auth:** Create `User` model in `app/models/user.py` and implement JWT login logic in `app/api/v1/endpoints/auth.py`.

### Phase 2: Core Business Logic (CRUD)

1. **Models:** Define `Student`, `Course`, `Enrollment` models in `app/models/`.
2. **Schemas:** Create Pydantic schemas in `app/schemas/` for validation.
3. **API:** Implement CRUD endpoints. Ensure relationships (e.g., adding a student to a class) are handled correctly.

### Phase 3: Analytics Engine (The "Brain")

1. **Grade Analysis Service:** Create `app/services/analytics.py` using `Pandas`.
* Function: Fetch grades -> Calculate Mean, Std Dev, Z-Score, Rank.


2. **Reporting:** Integrate `ReportLab` to generate PDF report cards.
3. **Async:** Setup `Celery` worker to handle these heavy tasks in the background.

### Phase 4: AI & Features (Extensions)

1. **Face Recognition:** Implement `app/services/attendance.py`.
* Logic: Image file input -> Vector encoding -> DB Match -> Attendance Record.


2. **Integration:** Expose this via an API endpoint (`POST /attendance/check`).

---

## 4. Coding Style & Rules

* **Modular:** Do not put logic in API routers. Use `app/services/` for logic.
* **Type Hinting:** Use Python type hints everywhere (e.g., `def get_user(db: Session) -> User:`).
* **Environment:** Never hardcode secrets. Use `.env`.

---

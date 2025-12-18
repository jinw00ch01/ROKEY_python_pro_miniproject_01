# Py-SMS (Python Smart LMS)

학생 관리 시스템(Student Management System)을 위한 확장 가능한 RESTful API 백엔드입니다.

## 목차

- [개요](#개요)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [API 엔드포인트](#api-엔드포인트)
- [데이터베이스 모델](#데이터베이스-모델)
- [주요 기능](#주요-기능)

---

## 개요

Py-SMS는 교육 기관을 위한 종합적인 학생 관리 시스템입니다. 학생, 과목, 수강신청, 성적 관리와 함께 데이터 분석 및 리포트 생성 기능을 제공합니다.

### 주요 특징

- **JWT 기반 인증**: 안전한 사용자 인증 및 권한 관리
- **CRUD API**: 학생, 과목, 수강신청, 성적에 대한 완전한 CRUD 작업
- **성적 분석**: Pandas를 활용한 통계 분석 (평균, 표준편차, Z-Score, 등급 분포)
- **시각화**: Matplotlib/Seaborn을 활용한 성적 분포 차트 생성
- **PDF 리포트**: ReportLab을 활용한 성적표 PDF 생성
- **비동기 작업**: Celery + Redis를 활용한 백그라운드 작업 처리
- **Docker 지원**: Docker Compose를 통한 간편한 배포

---

## 기술 스택

| 카테고리 | 기술 |
|---------|------|
| **언어** | Python 3.11+ |
| **웹 프레임워크** | FastAPI (비동기 지원) |
| **서버** | Uvicorn |
| **데이터베이스** | PostgreSQL |
| **ORM** | SQLAlchemy 2.0+ (Mapped, mapped_column 사용) |
| **마이그레이션** | Alembic |
| **유효성 검사** | Pydantic V2 |
| **인증** | JWT (python-jose, passlib) |
| **데이터 분석** | Pandas, NumPy |
| **시각화** | Matplotlib, Seaborn |
| **PDF 생성** | ReportLab |
| **비동기 큐** | Celery + Redis |
| **컨테이너** | Docker, Docker Compose |

---

## 프로젝트 구조

```
Py-SMS/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI 앱 엔트리포인트
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py        # API 라우터 설정
│   │       └── endpoints/
│   │           ├── __init__.py
│   │           ├── auth.py        # 인증 API (회원가입, 로그인)
│   │           ├── students.py    # 학생 CRUD API
│   │           ├── courses.py     # 과목 및 수강신청 API
│   │           ├── grades.py      # 성적 및 분석 API
│   │           └── tasks.py       # 비동기 작업 API
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py              # 환경 설정 (Pydantic BaseSettings)
│   │   └── security.py            # JWT 및 비밀번호 해싱
│   ├── db/
│   │   ├── __init__.py
│   │   ├── base.py                # SQLAlchemy Base 클래스
│   │   └── session.py             # DB 세션 및 엔진 설정
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py                # User 모델
│   │   ├── student.py             # Student, Course, Enrollment 모델
│   │   └── grade.py               # Grade 모델
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py                # User Pydantic 스키마
│   │   ├── student.py             # Student 스키마
│   │   ├── course.py              # Course 스키마
│   │   ├── enrollment.py          # Enrollment 스키마
│   │   └── grade.py               # Grade 및 통계 스키마
│   └── services/
│       ├── __init__.py
│       ├── auth.py                # 인증 비즈니스 로직
│       ├── student.py             # 학생 서비스
│       ├── course.py              # 과목/수강신청 서비스
│       ├── grade.py               # 성적 서비스
│       ├── analytics.py           # 성적 분석 (Pandas)
│       ├── pdf_report.py          # PDF 리포트 생성 (ReportLab)
│       ├── celery_worker.py       # Celery 워커 설정
│       ├── tasks.py               # Celery 비동기 태스크
│       └── attendance.py          # 출석 서비스 (확장용)
├── alembic/
│   ├── env.py                     # Alembic 환경 설정
│   ├── script.py.mako             # 마이그레이션 템플릿
│   └── versions/                  # 마이그레이션 버전 파일
├── tests/                         # 테스트 코드
├── .env                           # 환경 변수
├── .gitignore
├── alembic.ini                    # Alembic 설정
├── docker-compose.yml             # Docker Compose 설정
├── Dockerfile                     # Docker 이미지 빌드
└── requirements.txt               # Python 의존성
```

---

## 설치 및 실행

### 방법 1: Docker Compose (권장)

가장 간편한 방법으로, 모든 서비스가 자동으로 설정됩니다.

```bash
# 1. 프로젝트 디렉토리로 이동
cd Py-SMS

# 2. Docker Compose로 모든 서비스 실행
docker-compose up -d

# 3. 로그 확인
docker-compose logs -f

# 4. 서비스 중지
docker-compose down
```

**실행되는 서비스:**
- **app** (FastAPI): http://localhost:8000
- **db** (PostgreSQL): localhost:5432
- **redis**: localhost:6379
- **celery** (백그라운드 워커)

---

### 방법 2: 로컬 실행

#### 사전 요구사항

- Python 3.11 이상
- PostgreSQL 15
- Redis 7

#### 설치 단계

```bash
# 1. 프로젝트 디렉토리로 이동
cd Py-SMS

# 2. 가상환경 생성 및 활성화
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 환경 변수 설정 (.env 파일 수정)
# DATABASE_URL, REDIS_URL, SECRET_KEY 등 설정

# 5. 데이터베이스 마이그레이션
alembic upgrade head

# 6. 서버 실행
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# 7. (선택) Celery 워커 실행 (별도 터미널)
celery -A app.services.celery_worker worker --loglevel=info
```

### 환경 변수 (.env)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pysms
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=pysms

# JWT
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Redis
REDIS_URL=redis://localhost:6379/0

# App
DEBUG=True
```

### API 문서 접근

서버 실행 후 브라우저에서:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## API 엔드포인트

### 인증 (Authentication)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| POST | `/api/v1/auth/register` | 회원가입 |
| POST | `/api/v1/auth/login` | 로그인 (토큰 발급) |
| GET | `/api/v1/auth/me` | 현재 사용자 정보 |

### 학생 (Students)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/v1/students` | 학생 목록 조회 |
| GET | `/api/v1/students/{id}` | 학생 상세 조회 |
| POST | `/api/v1/students` | 학생 등록 |
| PUT | `/api/v1/students/{id}` | 학생 정보 수정 |
| DELETE | `/api/v1/students/{id}` | 학생 삭제 |

### 과목 (Courses)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/v1/courses` | 과목 목록 조회 |
| GET | `/api/v1/courses/{id}` | 과목 상세 조회 |
| POST | `/api/v1/courses` | 과목 등록 |
| PUT | `/api/v1/courses/{id}` | 과목 정보 수정 |
| DELETE | `/api/v1/courses/{id}` | 과목 삭제 |
| GET | `/api/v1/courses/{id}/enrollments` | 과목별 수강생 조회 |
| POST | `/api/v1/courses/enrollments` | 수강신청 |
| PUT | `/api/v1/courses/enrollments/{id}` | 수강신청 수정 |
| DELETE | `/api/v1/courses/enrollments/{id}` | 수강신청 삭제 |

### 성적 (Grades)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/v1/grades` | 성적 목록 조회 |
| GET | `/api/v1/grades/{id}` | 성적 상세 조회 |
| GET | `/api/v1/grades/student/{id}` | 학생별 성적 조회 |
| GET | `/api/v1/grades/course/{id}` | 과목별 성적 조회 |
| POST | `/api/v1/grades` | 성적 등록 |
| PUT | `/api/v1/grades/{id}` | 성적 수정 |
| DELETE | `/api/v1/grades/{id}` | 성적 삭제 |

### 분석 (Analytics)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/v1/grades/analytics/course/{id}` | 과목 통계 (평균, 표준편차, 등급분포) |
| GET | `/api/v1/grades/analytics/student/{id}/report` | 학생 성적 리포트 (GPA, Z-Score, 석차) |
| GET | `/api/v1/grades/analytics/course/{id}/chart` | 과목 성적 분포 차트 (PNG) |
| GET | `/api/v1/grades/analytics/student/{id}/report-card` | 학생 성적표 PDF |

### 비동기 작업 (Async Tasks)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| POST | `/api/v1/tasks/course-statistics/{id}` | 과목 통계 생성 (비동기) |
| POST | `/api/v1/tasks/student-report/{id}` | 학생 리포트 생성 (비동기) |
| POST | `/api/v1/tasks/grade-chart/{id}` | 차트 생성 (비동기) |
| POST | `/api/v1/tasks/report-card/{id}` | PDF 성적표 생성 (비동기) |
| POST | `/api/v1/tasks/batch-reports` | 다수 학생 리포트 일괄 생성 |
| GET | `/api/v1/tasks/status/{task_id}` | 작업 상태 조회 |

---

## 데이터베이스 모델

### ERD (Entity Relationship Diagram)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │   Student   │       │   Course    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │       │ id (PK)     │
│ email       │       │ student_id  │       │ course_code │
│ username    │       │ first_name  │       │ name        │
│ password    │       │ last_name   │       │ description │
│ full_name   │       │ email       │       │ credits     │
│ is_active   │       │ date_of_birth│      │ instructor  │
│ is_superuser│       │ phone       │       │ created_at  │
│ created_at  │       │ address     │       │ updated_at  │
│ updated_at  │       │ created_at  │       └──────┬──────┘
└─────────────┘       │ updated_at  │              │
                      └──────┬──────┘              │
                             │                     │
                             │  ┌──────────────┐   │
                             └──┤  Enrollment  ├───┘
                                ├──────────────┤
                                │ id (PK)      │
                                │ student_id(FK)│
                                │ course_id(FK)│
                                │ enrolled_at  │
                                │ status       │
                                └──────────────┘
                             │                     │
                             │  ┌──────────────┐   │
                             └──┤    Grade     ├───┘
                                ├──────────────┤
                                │ id (PK)      │
                                │ student_id(FK)│
                                │ course_id(FK)│
                                │ score        │
                                │ max_score    │
                                │ grade_type   │
                                │ semester     │
                                │ comments     │
                                │ created_at   │
                                │ updated_at   │
                                └──────────────┘
```

### 모델 설명

| 모델 | 설명 |
|------|------|
| **User** | 시스템 사용자 (관리자, 교수 등) |
| **Student** | 학생 정보 |
| **Course** | 과목 정보 |
| **Enrollment** | 수강신청 (Student-Course 다대다 관계) |
| **Grade** | 성적 정보 (점수, 유형, 학기 등) |

---

## 주요 기능

### 1. 성적 분석 (analytics.py)

Pandas와 NumPy를 활용한 통계 분석:

- **평균 (Mean)**: 과목별/학생별 평균 점수
- **중앙값 (Median)**: 성적 분포의 중앙값
- **표준편차 (Std Dev)**: 성적 분산도
- **Z-Score**: 개별 학생의 상대적 성취도
- **GPA 계산**: 4.0 스케일 학점 계산
- **석차 (Rank)**: 학기별 전체 석차

### 2. 시각화 (analytics.py)

Matplotlib과 Seaborn을 활용한 차트 생성:

- 성적 분포 히스토그램 (KDE 포함)
- 등급 분포 파이 차트

### 3. PDF 성적표 (pdf_report.py)

ReportLab을 활용한 성적표 생성:

- 학생 정보
- 과목별 성적 테이블
- GPA 및 총 학점
- 석차 정보
- Z-Score 분석

### 4. 비동기 작업 (Celery)

대용량 데이터 처리를 위한 백그라운드 작업:

- 개별 리포트 생성
- 일괄 리포트 생성
- 작업 진행률 추적

---

## 사용 예시

### 1. 회원가입 및 로그인

```bash
# 회원가입
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "username": "admin", "password": "password123", "full_name": "Admin User"}'

# 로그인
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=password123"
```

### 2. 학생 등록

```bash
curl -X POST "http://localhost:8000/api/v1/students" \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"student_id": "2024001", "first_name": "길동", "last_name": "홍", "email": "hong@example.com"}'
```

### 3. 성적 통계 조회

```bash
curl -X GET "http://localhost:8000/api/v1/grades/analytics/course/1?semester=2024-1" \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

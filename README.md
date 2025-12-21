# Py-SMS (Python Student Management System)

Django REST Framework + React TypeScript 기반의 학생 관리 시스템입니다.

---

## 목차

- [개요](#개요)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [빠른 시작](#빠른-시작)
- [API 엔드포인트](#api-엔드포인트)
- [배포](#배포)

---

## 개요

Py-SMS는 교육 기관을 위한 종합적인 학생 관리 시스템입니다.

### 주요 기능

- **학생 관리**: 학생 정보 CRUD
- **과목 관리**: 과목 및 수강신청 관리
- **성적 관리**: 성적 등록, 조회, 통계
- **대시보드**: 실시간 통계 및 등급 분포 차트
- **인증**: JWT 기반 사용자 인증

### 주요 특징

- **Backend**: Django REST Framework + PostgreSQL
- **Frontend**: React + TypeScript + Arctic White 테마
- **인증**: JWT (Simple JWT)
- **배포**: Render.com 지원

---

## 기술 스택

### Backend

| 기술 | 버전 | 용도 |
|------|------|------|
| Python | 3.11+ | 프로그래밍 언어 |
| Django | 4.2+ | 웹 프레임워크 |
| Django REST Framework | 3.14+ | REST API |
| PostgreSQL | 15+ | 데이터베이스 |
| Simple JWT | 5.3+ | JWT 인증 |
| Gunicorn | 21+ | WSGI 서버 |
| WhiteNoise | 6.6+ | 정적 파일 서빙 |

### Frontend

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18.2+ | UI 라이브러리 |
| TypeScript | 4.9+ | 타입 안전성 |
| React Router | 6.20+ | 클라이언트 라우팅 |
| Axios | 1.6+ | HTTP 클라이언트 |

### 디자인 시스템

- **테마**: Arctic White
- **컬러**: #f8fafc (Primary), #e2e8f0 (Secondary)
- **폰트**: Roboto + Noto Sans KR
- **스타일**: Sharp Modern (border-radius: 0px)
- **애니메이션**: Smooth Slide (0.3s ease-in-out)

---

## 프로젝트 구조

```
Py-SMS/
├── Backend/                    # Django REST API
│   ├── manage.py              # Django CLI
│   ├── requirements.txt       # Python 의존성
│   ├── render.yaml            # Render.com 설정
│   ├── build.sh               # 빌드 스크립트
│   ├── BACKEND.md             # Backend 상세 문서
│   ├── config/                # Django 설정
│   │   ├── settings.py        # 프로젝트 설정
│   │   ├── urls.py            # URL 라우팅
│   │   └── wsgi.py            # WSGI 설정
│   └── apps/                  # Django 앱들
│       ├── accounts/          # 사용자 인증
│       ├── students/          # 학생 관리
│       ├── courses/           # 과목/수강 관리
│       ├── grades/            # 성적 관리
│       └── analytics/         # 분석 API
│
└── Frontend/                   # React + TypeScript
    ├── package.json           # npm 의존성
    ├── tsconfig.json          # TypeScript 설정
    ├── FRONTEND.md            # Frontend 상세 문서
    ├── public/                # 정적 파일
    └── src/
        ├── components/        # 재사용 컴포넌트
        │   ├── common/        # Button, Card, Input, Modal, Table
        │   └── layout/        # Layout, Header, Sidebar
        ├── pages/             # 페이지 컴포넌트
        │   ├── Dashboard.tsx  # 대시보드
        │   ├── Students.tsx   # 학생 관리
        │   ├── Courses.tsx    # 과목 관리
        │   ├── Grades.tsx     # 성적 관리
        │   ├── Login.tsx      # 로그인
        │   └── Register.tsx   # 회원가입
        ├── services/          # API 서비스
        ├── styles/            # 전역 스타일
        └── types/             # TypeScript 타입
```

---

## 빠른 시작

### 사전 요구사항

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (또는 Docker)

### Backend 실행

```bash
# 1. 디렉토리 이동
cd Py-SMS/Backend

# 2. 가상환경 생성 및 활성화
python -m venv venv
source venv/Scripts/activate  # Windows (Git Bash)
# source venv/bin/activate    # macOS/Linux

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 환경 변수 설정
cp .env.example .env
# .env 파일 편집 (DATABASE_URL, SECRET_KEY 등)

# 5. 데이터베이스 마이그레이션
python manage.py migrate

# 6. 슈퍼유저 생성
python manage.py createsuperuser

# 7. 서버 실행
python manage.py runserver
```

**Backend 접속:**
- API: http://localhost:8000
- Admin: http://localhost:8000/admin/

### Frontend 실행

```bash
# 1. 디렉토리 이동
cd Py-SMS/Frontend

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# REACT_APP_API_URL=http://localhost:8000/api/v1

# 4. 개발 서버 실행
npm start
```

**Frontend 접속:**
- http://localhost:3000

---

## API 엔드포인트

### 인증

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/token/` | 로그인 (JWT 발급) |
| POST | `/api/v1/auth/token/refresh/` | 토큰 갱신 |
| POST | `/api/v1/accounts/users/` | 회원가입 |
| GET | `/api/v1/accounts/users/me/` | 현재 사용자 정보 |

### 학생

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/students/` | 학생 목록 |
| POST | `/api/v1/students/` | 학생 생성 |
| GET | `/api/v1/students/{id}/` | 학생 상세 |
| PATCH | `/api/v1/students/{id}/` | 학생 수정 |
| DELETE | `/api/v1/students/{id}/` | 학생 삭제 |

### 과목

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/courses/` | 과목 목록 |
| POST | `/api/v1/courses/` | 과목 생성 |
| GET | `/api/v1/courses/{id}/` | 과목 상세 |
| GET | `/api/v1/courses/{id}/students/` | 수강생 목록 |

### 성적

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/grades/` | 성적 목록 |
| POST | `/api/v1/grades/` | 성적 생성 |
| GET | `/api/v1/grades/by_student/` | 학생별 성적 |
| GET | `/api/v1/grades/by_course/` | 과목별 성적 |

### 분석

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/dashboard/` | 대시보드 통계 |
| GET | `/api/v1/analytics/grades/distribution/` | 등급 분포 |

---

## 배포

### Render.com 배포

#### Backend 배포

1. Render.com 대시보드 → **New** → **Web Service**
2. GitHub 저장소 연결
3. 설정:
   - **Root Directory**: `Py-SMS/Backend`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn config.wsgi:application`
4. 환경 변수:
   - `DATABASE_URL`: PostgreSQL 연결 URL
   - `SECRET_KEY`: Django 시크릿 키
   - `DEBUG`: `false`
   - `ALLOWED_HOSTS`: `.onrender.com`

#### Frontend 배포

1. Render.com 대시보드 → **New** → **Static Site**
2. GitHub 저장소 연결
3. 설정:
   - **Root Directory**: `Py-SMS/Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. 환경 변수:
   - `REACT_APP_API_URL`: Backend URL

자세한 배포 가이드는 `Py-SMS/Backend/BACKEND.md`를 참조하세요.

---

## 데이터베이스 모델

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │   Student   │       │   Course    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ username    │       │ student_id  │       │ course_code │
│ email       │       │ first_name  │       │ name        │
│ full_name   │       │ last_name   │       │ credits     │
│ is_instructor│      │ email       │       │ instructor  │
└─────────────┘       └──────┬──────┘       └──────┬──────┘
                             │                     │
                             │  ┌──────────────┐   │
                             ├──┤  Enrollment  ├───┤
                             │  └──────────────┘   │
                             │                     │
                             │  ┌──────────────┐   │
                             └──┤    Grade     ├───┘
                                ├──────────────┤
                                │ score        │
                                │ max_score    │
                                │ grade_type   │
                                │ semester     │
                                └──────────────┘
```

---

## 문서

- **Backend 상세 문서**: `Py-SMS/Backend/BACKEND.md`
- **Frontend 상세 문서**: `Py-SMS/Frontend/FRONTEND.md`

---

## 라이선스

MIT License

---

## 기여

이슈 및 풀 리퀘스트를 환영합니다.

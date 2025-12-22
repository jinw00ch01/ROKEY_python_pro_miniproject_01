# Py-SMS (Python Student Management System)

Django REST Framework + React TypeScript 기반의 학생 관리 시스템입니다. 커스텀 User 모델과 JWT(Simple JWT) 인증을 사용하며, PostgreSQL을 기본 DB로 하고 Render.com 배포를 지원합니다.

---

## 목차

- [개요](#개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [빠른 시작](#빠른-시작)
- [API 엔드포인트](#api-엔드포인트)
- [배포](#배포)
- [데이터베이스 모델](#데이터베이스-모델)
- [문서](#문서)
- [라이선스](#라이선스)
- [기여](#기여)

---

## 개요

Py-SMS는 교육 기관을 위한 종합 학생 관리 시스템입니다. 학생·과목·수강·성적 데이터를 관리하고, 대시보드와 분석 API를 제공합니다. 모든 주요 엔드포인트는 JWT 인증이 필요하며, 401 응답이 나오면 로그인 후 토큰을 포함해 요청해야 합니다.

### 주요 특징
- Backend: Django REST Framework + PostgreSQL, Gunicorn + WhiteNoise
- Frontend: React + TypeScript (Arctic White 테마)
- 인증: JWT(Simple JWT), 커스텀 User 모델(`accounts.User`, 테이블명 `users`)
- 배포: Render.com(Web Service + Static Site)

## 주요 기능

- 학생: 목록/검색/정렬/CRUD, full_name 프로퍼티
- 과목: 목록/검색/CRUD, 수강생 목록, 수강신청 CRUD
- 성적: CRUD, 학생별/과목별 조회, 통계, 등급 변환(A~F)
- 분석: 대시보드 통계, 등급 분포, 학생 성적 분석, 과목별 통계
- 인증: 회원가입, 로그인(JWT), 현재 사용자 정보 조회

## 기술 스택

### Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| Python | 3.11+ | 언어 |
| Django | 4.2+ | 웹 프레임워크 |
| DRF | 3.14+ | REST API |
| PostgreSQL | 15+ | DB |
| Simple JWT | 5.3+ | JWT 인증 |
| Gunicorn | 21+ | WSGI |
| WhiteNoise | 6.6+ | 정적 파일 서빙 |

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18.2+ | UI |
| TypeScript | 4.9+ | 타입 |
| React Router | 6.20+ | 라우팅 |
| Axios | 1.6+ | HTTP |

### 디자인 시스템
- 테마: Arctic White, Sharp Modern(border-radius 0)
- 컬러: #f8fafc(Primary), #e2e8f0(Secondary)
- 폰트: Roboto, Noto Sans KR
- 애니메이션: Smooth Slide(0.3s ease-in-out)

## 프로젝트 구조

```
Py-SMS/
├── Backend/
│   ├── manage.py / requirements.txt / render.yaml / build.sh
│   ├── config/ (settings, urls, wsgi)
│   └── apps/
│       ├── accounts/  (커스텀 User, 회원가입/로그인)
│       ├── students/  (학생 CRUD)
│       ├── courses/   (과목, 수강신청)
│       ├── grades/    (성적, 통계)
│       └── analytics/ (대시보드/통계)
└── Frontend/
    ├── public/
    └── src/
        ├── components/common, layout
        ├── pages (Dashboard, Students, Courses, Grades, Login, Register)
        ├── services (api.ts, auth/students/courses/grades/analytics.ts)
        └── types, styles
```

---

## 빠른 시작

### 사전 요구사항
- Python 3.11+, Node.js 18+, PostgreSQL 15+

### Backend 실행
```bash
cd Py-SMS/Backend
python -m venv venv
source venv/Scripts/activate    # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env            # 값 채우기 (DATABASE_URL, SECRET_KEY 등)
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver      # http://localhost:8000
```

### Frontend 실행
```bash
cd Py-SMS/Frontend
npm install
cp .env.example .env            # REACT_APP_API_URL 수정
npm start                       # http://localhost:3000
```

---

## API 엔드포인트

### 인증
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/token/` | 로그인(JWT 발급) |
| POST | `/api/v1/auth/token/refresh/` | 토큰 갱신 |
| POST | `/api/v1/accounts/users/` | 회원가입 |
| GET | `/api/v1/accounts/users/me/` | 현재 사용자 |

### 학생
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/v1/students/` | 목록 조회, 생성 |
| GET/PATCH/DELETE | `/api/v1/students/{id}/` | 상세/수정/삭제 |

### 과목
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/v1/courses/` | 목록 조회, 생성 |
| GET | `/api/v1/courses/{id}/students/` | 수강생 목록 |

### 성적
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/v1/grades/` | 목록/생성 |
| GET | `/api/v1/grades/by_student/` | 학생별 성적 |
| GET | `/api/v1/grades/by_course/` | 과목별 성적 |
| GET | `/api/v1/grades/statistics/` | 통계 |

### 분석
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/dashboard/` | 대시보드 통계 |
| GET | `/api/v1/analytics/grades/distribution/` | 등급 분포 |

모든 주요 엔드포인트는 JWT 인증이 필요합니다(401 응답 시 로그인/토큰 확인).

---

## 배포

### Render.com Backend (Web Service)
- Root Directory: `Py-SMS/Backend`
- Build Command: `./build.sh`
- Start Command: `gunicorn config.wsgi:application`
- Env: `DATABASE_URL`, `SECRET_KEY`, `DEBUG=false`, `ALLOWED_HOSTS=.onrender.com`, `CORS_ALLOWED_ORIGINS`에 프론트 도메인 추가

### Render.com Frontend (Static Site)
- Root Directory: `Py-SMS/Frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `build`
- Env: `REACT_APP_API_URL`에 백엔드 URL 설정

배포 후 점검
- 백엔드: `/admin/` 로그인 페이지 표시, 인증 필요한 엔드포인트는 401 또는 200 정상 응답
- 프론트: 로그인 후 대시보드/학생 목록이 200 응답인지 확인, CORS 에러 여부 확인

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
- Backend 상세: `Py-SMS/Backend/BACKEND.md`
- Frontend 상세: `Py-SMS/Frontend/FRONTEND.md`

---

## 라이선스
- MIT License

---

## 기여
- 이슈 및 풀 리퀘스트를 환영합니다.

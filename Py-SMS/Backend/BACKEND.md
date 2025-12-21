# Py-SMS Backend Documentation

## 📋 프로젝트 진행 상황

### ✅ 완료된 작업

#### 1. 프로젝트 초기 설정 (2025-12-20)
- Django 4.2+ 프로젝트 생성
- Django REST Framework 설정
- PostgreSQL 데이터베이스 연결
- JWT 인증 시스템 구축 (djangorestframework-simplejwt)

#### 2. 앱 구조 설계 및 구현 (2025-12-20)
- **accounts**: 사용자 인증 및 관리
  - 커스텀 User 모델
  - 회원가입 API
  - 로그인/로그아웃 API (JWT)
  - 현재 사용자 정보 조회 API

- **students**: 학생 관리
  - Student 모델 (학번, 이름, 이메일, 생년월일 등)
  - CRUD API (목록, 생성, 조회, 수정, 삭제)
  - 검색 및 필터링 (이름, 학번, 이메일)
  - 페이지네이션

- **courses**: 과목 및 수강 관리
  - Course 모델 (과목 코드, 과목명, 학점, 강사)
  - Enrollment 모델 (학생-과목 다대다 관계)
  - CRUD API
  - 수강생 목록 조회 API

- **grades**: 성적 관리
  - Grade 모델 (점수, 유형, 학기, 등급)
  - CRUD API
  - 학생별 성적 조회
  - 과목별 성적 조회
  - 성적 통계 API
  - 자동 등급 계산 (A/B/C/D/F)

- **analytics**: 분석 및 통계
  - 대시보드 통계 API (총 학생 수, 과목 수, 평균 성적 등)
  - 등급 분포 API
  - 학생 성적 분석 API
  - 과목별 통계 API

#### 3. API 설정 (2025-12-20)
- RESTful API 설계
- URL 라우팅 구조화
- CORS 설정 (django-cors-headers)
- 페이지네이션 설정 (PageNumberPagination)
- 필터링 설정 (django-filter)

#### 4. 보안 설정 (2025-12-20)
- JWT 액세스/리프레시 토큰
- 비밀번호 해싱 (Django 기본)
- ALLOWED_HOSTS 설정
- SECRET_KEY 환경 변수화
- DEBUG 모드 환경별 설정

#### 5. 배포 준비 (2025-12-20)
- Render.com 배포 설정
  -  작성
  -  스크립트 작성
  - 환경 변수 설정
- WhiteNoise 정적 파일 서빙
- Gunicorn WSGI 서버 설정
- PostgreSQL 프로덕션 데이터베이스 연결

#### 6. 관리자 페이지 (2025-12-20)
- Django Admin 커스터마이징
- 각 모델별 Admin 클래스 작성
- 검색 및 필터 기능 추가

---

### 🔄 진행 중인 작업

현재 진행 중인 작업이 없습니다.

---

### 📝 추가로 해야 할 작업

#### 우선순위 1: 기능 확장
1. **출석 관리 기능**
   - Attendance 모델 생성
   - 출석 체크 API
   - 출석률 통계 API

2. **과제 관리 기능**
   - Assignment 모델 생성
   - 과제 제출 API
   - 과제 평가 API

3. **공지사항 기능**
   - Announcement 모델 생성
   - CRUD API
   - 읽음 표시 기능

4. **파일 업로드**
   - 학생 프로필 사진 업로드
   - 과제 파일 업로드
   - 미디어 파일 관리

5. **CSV 데이터 임포트/엑스포트**
   - 학생 데이터 일괄 업로드
   - 성적 데이터 일괄 업로드
   - 데이터 엑스포트 (CSV, Excel)

#### 우선순위 2: API 개선
6. **권한 관리 강화**
   - 강사/관리자 권한 구분
   - 객체별 권한 설정
   - 커스텀 권한 클래스

7. **API 문서화**
   - Swagger/OpenAPI 문서 생성 (drf-spectacular)
   - API 사용 예제 추가
   - Postman 컬렉션 제공

8. **API 버전 관리**
   - v1, v2 버전 구분
   - 하위 호환성 유지

9. **페이지네이션 개선**
   - 커서 기반 페이지네이션
   - 페이지 크기 커스터마이징

10. **검색 기능 고도화**
    - 전체 텍스트 검색 (PostgreSQL Full-Text Search)
    - 자동완성 API
    - 고급 필터링

#### 우선순위 3: 성능 최적화
11. **쿼리 최적화**
    - select_related, prefetch_related 활용
    - 인덱스 추가
    - N+1 쿼리 해결

12. **캐싱 구현**
    - Redis 캐싱
    - 쿼리 결과 캐싱
    - API 응답 캐싱

13. **비동기 작업**
    - Celery 태스크 큐 설정
    - 이메일 발송 비동기 처리
    - PDF 생성 비동기 처리

#### 우선순위 4: 보안 및 안정성
14. **로깅 시스템**
    - 에러 로깅
    - 액세스 로그
    - 감사 로그 (Audit Trail)

15. **테스트 작성**
    - 유닛 테스트 (pytest)
    - API 테스트
    - 통합 테스트
    - 테스트 커버리지 80% 이상

16. **API 사용량 제한**
    - Rate Limiting (django-ratelimit)
    - Throttling 설정

17. **데이터 백업**
    - 자동 백업 스크립트
    - 데이터 복구 절차 문서화

#### 우선순위 5: 추가 기능
18. **이메일 알림**
    - 성적 등록 알림
    - 과제 마감 알림
    - 공지사항 알림

19. **PDF 리포트 생성**
    - 성적표 PDF
    - 출석부 PDF
    - 과목 리포트 PDF

20. **실시간 알림**
    - WebSocket 설정 (Django Channels)
    - 실시간 채팅
    - 푸시 알림

#### 우선순위 6: 배포 및 모니터링
21. **모니터링 설정**
    - Sentry 에러 트래킹
    - Application Performance Monitoring (APM)
    - 서버 리소스 모니터링

22. **CI/CD 파이프라인**
    - GitHub Actions 설정
    - 자동 테스트 실행
    - 자동 배포

23. **Docker 컨테이너화**
    - Dockerfile 작성
    - docker-compose.yml 작성
    - 개발 환경 통일

---

### 🐛 알려진 이슈

현재 알려진 이슈가 없습니다.

---

### 💡 개선 아이디어

1. **GraphQL API 지원** (선택적)
2. **모바일 앱 API 최적화**
3. **다중 테넌시 지원** (학교별 분리)
4. **AI 기반 성적 예측** (머신러닝)
5. **소셜 로그인** (Google, Naver, Kakao)

---

Django REST Framework 기반의 학생 관리 시스템 백엔드입니다.

---


## 디렉토리 구조 및 파일 설명

```
Backend/
├── manage.py
├── requirements.txt
├── render.yaml
├── build.sh
├── .env.example
├── .gitignore
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── apps/
    ├── __init__.py
    ├── accounts/
    ├── students/
    ├── courses/
    ├── grades/
    └── analytics/
```

---

## 루트 파일 설명

### `manage.py`
Django 프로젝트의 커맨드라인 유틸리티입니다.
- 서버 실행: `python manage.py runserver`
- 마이그레이션 생성: `python manage.py makemigrations`
- 마이그레이션 적용: `python manage.py migrate`
- 슈퍼유저 생성: `python manage.py createsuperuser`
- 정적 파일 수집: `python manage.py collectstatic`

### `requirements.txt`
Python 패키지 의존성 목록입니다.

| 패키지 | 버전 | 용도 |
|--------|------|------|
| Django | >=4.2.0 | 웹 프레임워크 |
| djangorestframework | >=3.14.0 | REST API 구축 |
| django-cors-headers | >=4.3.0 | CORS 설정 |
| django-filter | >=23.5 | 쿼리 필터링 |
| djangorestframework-simplejwt | >=5.3.0 | JWT 인증 |
| psycopg2-binary | >=2.9.9 | PostgreSQL 드라이버 |
| dj-database-url | >=2.1.0 | DATABASE_URL 파싱 |
| gunicorn | >=21.2.0 | WSGI 프로덕션 서버 |
| whitenoise | >=6.6.0 | 정적 파일 서빙 |
| python-dotenv | >=1.0.0 | 환경 변수 로드 |
| pandas | >=2.1.0 | 데이터 분석 |
| numpy | >=1.26.0 | 수치 계산 |

### `render.yaml`
Render.com 배포를 위한 Infrastructure as Code (IaC) 설정 파일입니다.
- **databases**: PostgreSQL 데이터베이스 설정
- **services**: 웹 서비스 설정 (빌드 명령, 시작 명령, 환경 변수)

### `build.sh`
Render.com에서 배포 시 실행되는 빌드 스크립트입니다.
1. 의존성 설치 (`pip install`)
2. 정적 파일 수집 (`collectstatic`)
3. 데이터베이스 마이그레이션 (`migrate`)

### `.env.example`
환경 변수 템플릿입니다. 실제 `.env` 파일 생성 시 참고합니다.

### `.gitignore`
Git에서 추적하지 않을 파일/디렉토리 목록입니다.

---

## config/ 디렉토리

Django 프로젝트의 핵심 설정 디렉토리입니다.

### `config/__init__.py`
Python 패키지로 인식하기 위한 빈 파일입니다.

### `config/settings.py`
Django 프로젝트의 모든 설정을 관리합니다.

**주요 설정:**
| 설정 | 설명 |
|------|------|
| `SECRET_KEY` | Django 보안 키 (환경변수에서 로드) |
| `DEBUG` | 디버그 모드 (프로덕션에서는 False) |
| `ALLOWED_HOSTS` | 허용된 호스트 목록 |
| `INSTALLED_APPS` | 설치된 앱 목록 (accounts, students, courses, grades, analytics) |
| `DATABASES` | PostgreSQL 데이터베이스 설정 (dj-database-url 지원) |
| `AUTH_USER_MODEL` | 커스텀 User 모델 (accounts.User) |
| `REST_FRAMEWORK` | DRF 설정 (JWT 인증, 페이지네이션, 필터링) |
| `SIMPLE_JWT` | JWT 토큰 설정 (유효 기간 등) |
| `CORS_ALLOWED_ORIGINS` | CORS 허용 도메인 |
| `STATICFILES_STORAGE` | WhiteNoise 정적 파일 스토리지 |

### `config/urls.py`
URL 라우팅 설정입니다.

| URL 패턴 | 연결 | 설명 |
|----------|------|------|
| `/admin/` | Django Admin | 관리자 페이지 |
| `/api/v1/auth/token/` | SimpleJWT | 토큰 발급 (로그인) |
| `/api/v1/auth/token/refresh/` | SimpleJWT | 토큰 갱신 |
| `/api/v1/accounts/` | accounts.urls | 사용자 관리 API |
| `/api/v1/students/` | students.urls | 학생 관리 API |
| `/api/v1/courses/` | courses.urls | 과목/수강 관리 API |
| `/api/v1/grades/` | grades.urls | 성적 관리 API |
| `/api/v1/analytics/` | analytics.urls | 분석 API |

### `config/wsgi.py`
WSGI (Web Server Gateway Interface) 설정입니다.
- Gunicorn 등 WSGI 서버가 Django 앱을 실행할 때 사용
- Render.com에서 `gunicorn config.wsgi:application`으로 실행

---

## apps/ 디렉토리

각 기능별로 분리된 Django 앱들입니다.

### apps/__init__.py
Python 패키지로 인식하기 위한 빈 파일입니다.

---

## apps/accounts/ - 사용자 인증

### `accounts/__init__.py`
패키지 초기화 파일입니다.

### `accounts/apps.py`
앱 설정 클래스입니다. Django가 앱을 로드할 때 사용합니다.
- `name`: 앱의 전체 경로 (`apps.accounts`)
- `verbose_name`: 관리자 페이지에서 표시되는 이름

### `accounts/models.py`
**User 모델** - 커스텀 사용자 모델입니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| username | CharField | 사용자명 (AbstractUser 상속) |
| email | EmailField | 이메일 (unique) |
| full_name | CharField | 전체 이름 |
| is_instructor | BooleanField | 강사 여부 |
| created_at | DateTimeField | 생성 시간 (auto_now_add) |
| updated_at | DateTimeField | 수정 시간 (auto_now) |

### `accounts/serializers.py`
DRF 시리얼라이저입니다.

| 클래스 | 용도 |
|--------|------|
| `UserSerializer` | 사용자 정보 조회/수정 |
| `UserCreateSerializer` | 회원가입 (비밀번호 해싱 포함) |

### `accounts/views.py`
**UserViewSet** - 사용자 CRUD API입니다.
- `create`: 회원가입 (AllowAny)
- `me`: 현재 로그인한 사용자 정보 조회

### `accounts/urls.py`
URL 라우팅입니다.
- `users/` → UserViewSet (CRUD)
- `users/me/` → 현재 사용자 정보

### `accounts/admin.py`
Django Admin 설정입니다. 사용자 관리 페이지를 커스터마이즈합니다.

---

## apps/students/ - 학생 관리

### `students/models.py`
**Student 모델** - 학생 정보입니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| student_id | CharField | 학번 (unique) |
| first_name | CharField | 이름 |
| last_name | CharField | 성 |
| email | EmailField | 이메일 (unique) |
| date_of_birth | DateField | 생년월일 (optional) |
| phone | CharField | 전화번호 (optional) |
| address | TextField | 주소 (optional) |
| created_at | DateTimeField | 생성 시간 |
| updated_at | DateTimeField | 수정 시간 |

**프로퍼티:**
- `full_name`: 전체 이름 반환

### `students/serializers.py`
| 클래스 | 용도 |
|--------|------|
| `StudentSerializer` | 상세 정보 조회/수정 |
| `StudentListSerializer` | 목록 조회 (간략 정보) |

### `students/views.py`
**StudentViewSet** - 학생 CRUD API입니다.
- 필터링: `student_id`
- 검색: `first_name`, `last_name`, `email`, `student_id`
- 정렬: `created_at`, `last_name`, `first_name`

### `students/urls.py`
- `/` → 학생 목록/생성
- `/{id}/` → 학생 상세/수정/삭제

### `students/admin.py`
Django Admin에서 학생 관리 인터페이스를 제공합니다.

---

## apps/courses/ - 과목/수강 관리

### `courses/models.py`

**Course 모델** - 과목 정보입니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| course_code | CharField | 과목 코드 (unique) |
| name | CharField | 과목명 |
| description | TextField | 설명 (optional) |
| credits | IntegerField | 학점 (기본값: 3) |
| instructor | CharField | 담당 강사 (optional) |
| created_at | DateTimeField | 생성 시간 |
| updated_at | DateTimeField | 수정 시간 |

**Enrollment 모델** - 수강신청 (Student-Course 다대다 관계)입니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| student | ForeignKey | 학생 참조 |
| course | ForeignKey | 과목 참조 |
| enrolled_at | DateTimeField | 수강신청 시간 |
| status | CharField | 상태 (active/completed/dropped) |

### `courses/serializers.py`
| 클래스 | 용도 |
|--------|------|
| `CourseSerializer` | 과목 상세 (수강생 수 포함) |
| `CourseListSerializer` | 과목 목록 |
| `EnrollmentSerializer` | 수강신청 정보 |
| `EnrollmentCreateSerializer` | 수강신청 생성 |

### `courses/views.py`
- **CourseViewSet**: 과목 CRUD + 수강생 조회 (`students` 액션)
- **EnrollmentViewSet**: 수강신청 CRUD

### `courses/urls.py`
- `/` → 과목 목록/생성
- `/{id}/` → 과목 상세/수정/삭제
- `/{id}/students/` → 해당 과목 수강생 목록
- `/enrollments/` → 수강신청 관리

---

## apps/grades/ - 성적 관리

### `grades/models.py`
**Grade 모델** - 성적 정보입니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| student | ForeignKey | 학생 참조 |
| course | ForeignKey | 과목 참조 |
| score | FloatField | 점수 |
| max_score | FloatField | 만점 (기본값: 100) |
| grade_type | CharField | 유형 (exam/quiz/assignment/project/midterm/final) |
| semester | CharField | 학기 (예: "2024-1") |
| comments | TextField | 코멘트 (optional) |
| created_at | DateTimeField | 생성 시간 |
| updated_at | DateTimeField | 수정 시간 |

**프로퍼티:**
- `percentage`: 백분율 점수 계산
- `letter_grade`: 등급 변환 (A/B/C/D/F)

### `grades/serializers.py`
| 클래스 | 용도 |
|--------|------|
| `GradeSerializer` | 성적 상세 |
| `GradeCreateSerializer` | 성적 생성/수정 |
| `GradeListSerializer` | 성적 목록 |

### `grades/views.py`
**GradeViewSet** - 성적 CRUD + 조회 액션입니다.
- `by_student`: 특정 학생의 모든 성적
- `by_course`: 특정 과목의 모든 성적
- `statistics`: 과목별 성적 통계

### `grades/urls.py`
- `/` → 성적 목록/생성
- `/{id}/` → 성적 상세/수정/삭제
- `/by_student/` → 학생별 성적 조회
- `/by_course/` → 과목별 성적 조회
- `/statistics/` → 통계

---

## apps/analytics/ - 분석 API

### `analytics/apps.py`
앱 설정입니다.

### `analytics/views.py`
분석 API 뷰들입니다.

| 클래스 | URL | 설명 |
|--------|-----|------|
| `DashboardStatsView` | `/dashboard/` | 전체 통계 (학생 수, 과목 수, 평균 성적 등) |
| `CourseAnalyticsView` | `/courses/` | 과목별 통계 |
| `GradeDistributionView` | `/grades/distribution/` | 등급 분포 (A/B/C/D/F) |
| `StudentPerformanceView` | `/students/performance/` | 학생 성적 분석 |

### `analytics/urls.py`
분석 API URL 라우팅입니다.

---

## Render.com 배포 가이드

### 1. 사전 준비

1. [Render.com](https://render.com) 계정 생성
2. GitHub 저장소에 프로젝트 푸시
3. Render 대시보드에서 GitHub 연동

### 2. 데이터베이스 생성

1. Render 대시보드 → **New** → **PostgreSQL**
2. 설정:
   - **Name**: `py-sms-db`
   - **Database**: `py_sms`
   - **User**: `py_sms_user`
   - **Region**: Oregon (US West)
   - **Plan**: Free
3. **Create Database** 클릭
4. 생성 완료 후 **External Database URL** 복사

### 3. 웹 서비스 생성

1. Render 대시보드 → **New** → **Web Service**
2. GitHub 저장소 연결
3. 설정:

| 항목 | 값 |
|------|-----|
| **Name** | `py-sms-backend` |
| **Region** | Oregon (US West) |
| **Branch** | `main` |
| **Root Directory** | `Py-SMS/Backend` |
| **Runtime** | Python 3 |
| **Build Command** | `./build.sh` |
| **Start Command** | `gunicorn config.wsgi:application` |
| **Plan** | Free |

4. 환경 변수 설정 (**Environment** 탭):

| Key | Value |
|-----|-------|
| `DATABASE_URL` | (PostgreSQL External URL 붙여넣기) |
| `SECRET_KEY` | (Generate 클릭 또는 직접 입력) |
| `DEBUG` | `false` |
| `ALLOWED_HOSTS` | `.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | `https://your-frontend.onrender.com` |

5. **Create Web Service** 클릭

### 4. 배포 확인

1. 빌드 로그 확인 (약 2-5분 소요)
2. 배포 완료 후 제공된 URL 접속
3. `/admin/` 경로로 Django Admin 접근

### 5. 슈퍼유저 생성 (Shell 사용)

1. Render 대시보드 → 웹 서비스 선택 → **Shell** 탭
2. 명령어 실행:
```bash
python manage.py createsuperuser
```

### 6. Blueprint 사용 (선택)

`render.yaml` 파일을 사용하면 한 번에 모든 서비스를 배포할 수 있습니다.

1. Render 대시보드 → **New** → **Blueprint**
2. GitHub 저장소 선택
3. `render.yaml` 파일이 자동 감지됨
4. **Apply** 클릭

### 7. 주의사항

- **Free Plan 제한**: 15분 비활성화 시 슬립 모드 진입
- **정적 파일**: WhiteNoise가 자동으로 서빙
- **데이터베이스**: Free Plan은 90일 후 만료
- **환경 변수**: 민감한 정보는 반드시 환경 변수로 관리

---

## API 엔드포인트 요약

### 인증
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/token/` | 로그인 (JWT 토큰 발급) |
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
| GET | `/api/v1/grades/statistics/` | 통계 |

### 분석
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/dashboard/` | 대시보드 통계 |
| GET | `/api/v1/analytics/grades/distribution/` | 등급 분포 |
| GET | `/api/v1/analytics/students/performance/` | 학생 성적 분석 |

---

## 로컬 개발 환경 설정

```bash
# 1. 디렉토리 이동
cd Py-SMS/Backend

# 2. 가상환경 생성 및 활성화
python -m venv venv
source venv/Scripts/activate  # Windows (Git Bash)

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 환경 변수 설정
cp .env.example .env
# .env 파일 편집하여 DATABASE_URL 등 설정

# 5. 데이터베이스 마이그레이션
python manage.py migrate

# 6. 슈퍼유저 생성
python manage.py createsuperuser

# 7. 서버 실행
python manage.py runserver
```

**접속 URL:**
- API: http://localhost:8000
- Admin: http://localhost:8000/admin/

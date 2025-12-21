# Py-SMS Frontend Documentation

## 📋 프로젝트 진행 상황

### ✅ 완료된 작업

#### 1. 초기 프로젝트 구조 설정 (2025-12-21)
- React + TypeScript 프로젝트 생성
- 디렉토리 구조 설계 및 구현
- 기본 라우팅 설정 (React Router v6)
- Arctic White 디자인 시스템 구축

#### 2. 컴포넌트 개발 (2025-12-21)
- **공통 컴포넌트**: Button, Card, Input, Modal, Table
- **레이아웃 컴포넌트**: Layout, Sidebar, Header
- **페이지 컴포넌트**: Dashboard, Students, Courses, Grades, Login, Register

#### 3. API 서비스 구현 (2025-12-21)
- Axios 인스턴스 설정 (JWT 인터셉터 포함)
- 인증 서비스 (login, logout, getCurrentUser)
- CRUD 서비스 (students, courses, grades, analytics)

#### 4. 한국어 지역화 (2025-12-21)
- **변경된 파일**: 6개
  -  - 페이지 제목 및 메타 설명
  -  - 로그인 페이지 UI
  -  - 회원가입 페이지 UI
  -  - 학생 관리 페이지 UI
  -  - 과목 관리 페이지 UI
  -  - 성적 관리 페이지 UI
- **변경 내용**:
  - 모든 버튼 레이블 한국어 변경
  - 폼 레이블 및 플레이스홀더 한국어 변경
  - 오류 메시지 및 안내 문구 한국어 변경
  - 로딩 메시지 및 확인 대화상자 한국어 변경

#### 5. 네비게이션 기능 추가 (2025-12-21)
- **Sidebar 로고 링크**: Py-SMS 로고 클릭 시 홈(/)으로 이동
- **Dashboard 버튼**: 로그인/회원가입 페튼 추가
- **Login/Register 페이지**: 홈으로 돌아가기 링크 추가

#### 6. 빌드 및 테스트
- 프로덕션 빌드 성공 (74.75 kB gzipped)
- CSS 모듈 정상 작동
- 라우팅 테스트 완료

---

### 🔄 진행 중인 작업

현재 진행 중인 작업이 없습니다.

---

### 📝 추가로 해야 할 작업

#### 우선순위 1: 핵심 기능 구현
1. **학생 상세 페이지 구현**
   - 학생 정보 표시
   - 수강 과목 목록
   - 성적 내역
   - 편집/삭제 기능

2. **학생 추가/수정 폼 구현**
   - 학번, 이름, 이메일 등 필수 정보 입력
   - 생년월일, 전화번호, 주소 등 선택 정보 입력
   - 유효성 검사
   - API 연동

3. **과목 상세 페이지 구현**
   - 과목 정보 표시
   - 수강생 목록
   - 성적 현황
   - 편집/삭제 기능

4. **과목 추가/수정 폼 구현**
   - 과목 코드, 과목명, 학점, 강사 등 입력
   - 유효성 검사
   - API 연동

5. **성적 상세 페이지 구현**
   - 성적 정보 표시
   - 학생 및 과목 정보
   - 편집/삭제 기능

6. **성적 추가/수정 폼 구현**
   - 학생 선택 (드롭다운)
   - 과목 선택 (드롭다운)
   - 점수, 유형, 학기 등 입력
   - 유효성 검사
   - API 연동

#### 우선순위 2: UX 개선
7. **로딩 상태 개선**
   - 스켈레톤 UI 추가
   - 로딩 스피너 커스터마이즈

8. **에러 처리 개선**
   - 전역 에러 바운더리
   - 토스트 알림 컴포넌트
   - 네트워크 에러 핸들링

9. **페이지네이션 구현**
   - 학생 목록 페이지네이션
   - 과목 목록 페이지네이션
   - 성적 목록 페이지네이션

10. **검색 및 필터 개선**
    - 디바운스 적용
    - 고급 필터 옵션
    - 정렬 기능

#### 우선순위 3: 추가 기능
11. **분석 페이지 구현**
    - 대시보드 차트 고도화
    - 학생별 성적 분석
    - 과목별 성적 분포

12. **수강신청 기능**
    - 학생별 수강신청
    - 수강 취소
    - 수강 내역 관리

13. **PDF 리포트 생성**
    - 학생 성적표
    - 과목별 성적 리포트

14. **파일 업로드**
    - 학생 프로필 사진
    - CSV 일괄 업로드

#### 우선순위 4: 최적화 및 배포
15. **성능 최적화**
    - 코드 스플리팅
    - 이미지 최적화
    - 메모이제이션

16. **접근성 개선**
    - ARIA 레이블
    - 키보드 네비게이션
    - 스크린 리더 지원

17. **테스트 작성**
    - 유닛 테스트 (Jest)
    - 컴포넌트 테스트 (React Testing Library)
    - E2E 테스트 (Cypress)

18. **배포 설정**
    - Render.com 배포
    - 환경 변수 설정
    - CI/CD 파이프라인

---

### 🐛 알려진 이슈

현재 알려진 이슈가 없습니다.

---

### 💡 개선 아이디어

1. **다크 모드 지원**
2. **반응형 디자인 개선** (태블릿, 모바일)
3. **다국어 지원** (i18n)
4. **오프라인 모드** (PWA)
5. **실시간 알림** (WebSocket)

---

React + TypeScript 기반의 학생 관리 시스템 프론트엔드입니다.

---


## 디렉토리 구조

```
Frontend/
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── public/
│   └── index.html
└── src/
    ├── index.tsx
    ├── App.tsx
    ├── react-app-env.d.ts
    ├── components/
    │   ├── common/
    │   │   ├── index.ts
    │   │   ├── Button.tsx
    │   │   ├── Button.module.css
    │   │   ├── Card.tsx
    │   │   ├── Card.module.css
    │   │   ├── Input.tsx
    │   │   ├── Input.module.css
    │   │   ├── Modal.tsx
    │   │   ├── Modal.module.css
    │   │   ├── Table.tsx
    │   │   └── Table.module.css
    │   └── layout/
    │       ├── index.ts
    │       ├── Layout.tsx
    │       ├── Layout.module.css
    │       ├── Header.tsx
    │       ├── Header.module.css
    │       ├── Sidebar.tsx
    │       └── Sidebar.module.css
    ├── pages/
    │   ├── index.ts
    │   ├── Dashboard.tsx
    │   ├── Dashboard.module.css
    │   ├── Students.tsx
    │   ├── Students.module.css
    │   ├── Courses.tsx
    │   ├── Courses.module.css
    │   ├── Grades.tsx
    │   ├── Grades.module.css
    │   ├── Login.tsx
    │   ├── Login.module.css
    │   └── Register.tsx
    ├── services/
    │   ├── api.ts
    │   ├── auth.ts
    │   ├── students.ts
    │   ├── courses.ts
    │   ├── grades.ts
    │   └── analytics.ts
    ├── styles/
    │   └── globals.css
    └── types/
        └── index.ts
```

---

## 루트 파일 설명

### `package.json`
npm 프로젝트 설정 및 의존성 목록입니다.

**주요 의존성:**
| 패키지 | 버전 | 용도 |
|--------|------|------|
| react | ^18.2.0 | UI 라이브러리 |
| react-dom | ^18.2.0 | React DOM 렌더링 |
| react-router-dom | ^6.20.0 | 클라이언트 사이드 라우팅 |
| axios | ^1.6.0 | HTTP 클라이언트 |
| typescript | ^4.9.5 | 타입스크립트 |
| react-scripts | 5.0.1 | Create React App 스크립트 |

**스크립트:**
| 명령어 | 설명 |
|--------|------|
| `npm start` | 개발 서버 실행 (http://localhost:3000) |
| `npm run build` | 프로덕션 빌드 |
| `npm test` | 테스트 실행 |

### `tsconfig.json`
TypeScript 컴파일러 설정입니다.

**주요 설정:**
| 옵션 | 값 | 설명 |
|------|-----|------|
| target | ES6 | 컴파일 대상 ECMAScript 버전 |
| strict | true | 엄격한 타입 체크 |
| jsx | react-jsx | JSX 변환 방식 |
| baseUrl | src | 절대 경로 기준 디렉토리 |
| moduleResolution | node | 모듈 해석 방식 |

### `.env.example`
환경 변수 템플릿입니다.
```
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### `.gitignore`
Git에서 추적하지 않을 파일 목록입니다.
- `node_modules/`
- `build/`
- `.env`

---

## public/ 디렉토리

### `public/index.html`
React 앱의 HTML 템플릿입니다.

**포함 요소:**
- 메타 태그 (viewport, charset, theme-color)
- Google Fonts 로드 (Roboto, Noto Sans KR)
- `<div id="root">` - React 앱 마운트 포인트

---

## src/ 루트 파일

### `src/index.tsx`
React 앱의 엔트리 포인트입니다.
- `ReactDOM.createRoot`로 앱 마운트
- `React.StrictMode` 래핑
- 글로벌 CSS 임포트

### `src/App.tsx`
라우팅 설정 및 메인 앱 컴포넌트입니다.

**라우트 구조:**
| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | Dashboard | 대시보드 (홈) |
| `/login` | Login | 로그인 페이지 |
| `/register` | Register | 회원가입 페이지 |
| `/students` | Students | 학생 관리 |
| `/students/new` | Students | 학생 추가 |
| `/students/:id` | Students | 학생 상세 |
| `/courses` | Courses | 과목 관리 |
| `/courses/new` | Courses | 과목 추가 |
| `/courses/:id` | Courses | 과목 상세 |
| `/grades` | Grades | 성적 관리 |
| `/grades/new` | Grades | 성적 추가 |
| `/grades/:id` | Grades | 성적 상세 |
| `/analytics` | Dashboard | 분석 (대시보드와 동일) |

### `src/react-app-env.d.ts`
TypeScript 타입 선언 파일입니다.
- Create React App 타입 참조
- CSS 모듈 타입 선언

---

## src/types/ - 타입 정의

### `types/index.ts`
전체 앱에서 사용하는 TypeScript 인터페이스 정의입니다.

**User 타입:**
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_instructor: boolean;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
}
```

**Student 타입:**
```typescript
interface Student {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  date_of_birth?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}
```

**Course 타입:**
```typescript
interface Course {
  id: number;
  course_code: string;
  name: string;
  description?: string;
  credits: number;
  instructor?: string;
  student_count?: number;
  created_at: string;
  updated_at: string;
}
```

**Grade 타입:**
```typescript
interface Grade {
  id: number;
  student: StudentListItem;
  course: CourseListItem;
  score: number;
  max_score: number;
  grade_type: GradeType;
  semester: string;
  percentage: number;
  letter_grade: string;
  comments?: string;
  created_at: string;
  updated_at: string;
}

type GradeType = 'exam' | 'quiz' | 'assignment' | 'project' | 'midterm' | 'final';
```

**Analytics 타입:**
```typescript
interface DashboardStats {
  total_students: number;
  total_courses: number;
  active_enrollments: number;
  total_grades: number;
  average_grade: number;
}

interface GradeDistribution {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}
```

**API 응답 타입:**
```typescript
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface AuthTokens {
  access: string;
  refresh: string;
}
```

---

## src/services/ - API 서비스

### `services/api.ts`
Axios 인스턴스 및 인터셉터 설정입니다.

**기능:**
- 기본 URL 설정 (`REACT_APP_API_URL`)
- 요청 인터셉터: Authorization 헤더에 JWT 토큰 추가
- 응답 인터셉터: 401 에러 시 토큰 갱신 시도

**토큰 관리:**
- `access_token`: localStorage에 저장
- `refresh_token`: localStorage에 저장
- 토큰 갱신 실패 시 `/login`으로 리다이렉트

### `services/auth.ts`
인증 관련 API 호출입니다.

| 함수 | 설명 |
|------|------|
| `login(credentials)` | 로그인 및 토큰 저장 |
| `logout()` | 토큰 삭제 |
| `getCurrentUser()` | 현재 사용자 정보 조회 |
| `isAuthenticated()` | 로그인 상태 확인 |

### `services/students.ts`
학생 관련 API 호출입니다.

| 함수 | 설명 |
|------|------|
| `getAll(params)` | 학생 목록 조회 (페이지네이션, 검색) |
| `getById(id)` | 학생 상세 조회 |
| `create(data)` | 학생 생성 |
| `update(id, data)` | 학생 수정 |
| `delete(id)` | 학생 삭제 |

### `services/courses.ts`
과목 관련 API 호출입니다.

| 함수 | 설명 |
|------|------|
| `getAll(params)` | 과목 목록 조회 |
| `getById(id)` | 과목 상세 조회 |
| `create(data)` | 과목 생성 |
| `update(id, data)` | 과목 수정 |
| `delete(id)` | 과목 삭제 |
| `getStudents(courseId)` | 수강생 목록 조회 |

### `services/grades.ts`
성적 관련 API 호출입니다.

| 함수 | 설명 |
|------|------|
| `getAll(params)` | 성적 목록 조회 |
| `getById(id)` | 성적 상세 조회 |
| `create(data)` | 성적 생성 |
| `update(id, data)` | 성적 수정 |
| `delete(id)` | 성적 삭제 |
| `getByStudent(studentId)` | 학생별 성적 조회 |
| `getByCourse(courseId)` | 과목별 성적 조회 |

### `services/analytics.ts`
분석 관련 API 호출입니다.

| 함수 | 설명 |
|------|------|
| `getDashboardStats()` | 대시보드 통계 |
| `getGradeDistribution(params)` | 등급 분포 |
| `getStudentPerformance(studentId)` | 학생 성적 분석 |

---

## src/styles/ - 스타일

### `styles/globals.css`
전역 CSS 변수 및 기본 스타일입니다.

**Arctic White 컬러 시스템:**
| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--primary` | #f8fafc | 아이스 화이트 (배경) |
| `--secondary` | #e2e8f0 | 라이트 그레이 |
| `--accent` | #cbd5e1 | 미디엄 그레이 |
| `--success` | #10b981 | 성공 (녹색) |
| `--warning` | #f59e0b | 경고 (주황) |
| `--error` | #ef4444 | 에러 (빨강) |
| `--gray-50` ~ `--gray-900` | #ffffff ~ #0f172a | 그레이 스케일 |

**타이포그래피:**
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--font-primary` | Roboto, Noto Sans KR | 기본 폰트 |
| `--font-size-base` | 16px | 기본 글자 크기 |
| `--font-scale` | 1.2 | 폰트 크기 비율 |
| `--line-height` | 1.5 | 기본 줄 높이 |

**Tight Spacing 시스템:**
| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--spacing-xs` | 4px | 최소 간격 |
| `--spacing-sm` | 8px | 작은 간격 |
| `--spacing-md` | 16px | 중간 간격 |
| `--spacing-lg` | 24px | 큰 간격 |
| `--spacing-xl` | 32px | 최대 간격 |

**Sharp Modern 컴포넌트:**
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--border-radius` | 0px | 모서리 (직각) |
| `--shadow` | 0 2px 4px rgba(0,0,0,0.15) | 기본 그림자 |
| `--shadow-hover` | 0 4px 8px rgba(0,0,0,0.2) | 호버 그림자 |

**Smooth Slide 애니메이션:**
| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--transition-fast` | 0.15s ease | 빠른 전환 |
| `--transition-normal` | 0.3s ease-in-out | 일반 전환 |

---

## src/components/common/ - 공통 컴포넌트

### `common/index.ts`
공통 컴포넌트 내보내기 배럴 파일입니다.

### `common/Button.tsx` + `Button.module.css`
재사용 가능한 버튼 컴포넌트입니다.

**Props:**
| Prop | Type | Default | 설명 |
|------|------|---------|------|
| variant | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' | 'primary' | 버튼 스타일 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 버튼 크기 |
| children | ReactNode | - | 버튼 내용 |

**스타일 특징:**
- 호버 시 `translateY(-2px)` 상승 효과
- 클릭 시 원위치
- 비활성화 시 투명도 0.6

### `common/Card.tsx` + `Card.module.css`
카드 컴포넌트입니다.

**Props:**
| Prop | Type | 설명 |
|------|------|------|
| title | string (optional) | 카드 제목 |
| children | ReactNode | 카드 내용 |
| className | string (optional) | 추가 클래스 |

**스타일 특징:**
- 호버 시 `translateY(-2px)` 상승 효과
- 그림자 효과

### `common/Input.tsx` + `Input.module.css`
입력 필드 컴포넌트입니다.

**Props:**
| Prop | Type | 설명 |
|------|------|------|
| label | string (optional) | 레이블 텍스트 |
| error | string (optional) | 에러 메시지 |
| ...rest | InputHTMLAttributes | 기본 input 속성 |

**스타일 특징:**
- 포커스 시 테두리 색상 변경
- 에러 시 빨간 테두리

### `common/Modal.tsx` + `Modal.module.css`
모달 다이얼로그 컴포넌트입니다.

**Props:**
| Prop | Type | 설명 |
|------|------|------|
| isOpen | boolean | 모달 표시 여부 |
| onClose | () => void | 닫기 콜백 |
| title | string | 모달 제목 |
| children | ReactNode | 모달 내용 |

**기능:**
- ESC 키로 닫기
- 오버레이 클릭으로 닫기
- 열릴 때 body 스크롤 잠금
- Smooth Slide 애니메이션

### `common/Table.tsx` + `Table.module.css`
제네릭 테이블 컴포넌트입니다.

**Props:**
| Prop | Type | 설명 |
|------|------|------|
| columns | Column<T>[] | 컬럼 정의 |
| data | T[] | 데이터 배열 |
| onRowClick | (item: T) => void (optional) | 행 클릭 콜백 |
| keyField | keyof T | 고유 키 필드 (기본: 'id') |

**Column 인터페이스:**
```typescript
interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
}
```

---

## src/components/layout/ - 레이아웃 컴포넌트

### `layout/index.ts`
레이아웃 컴포넌트 내보내기 배럴 파일입니다.

### `layout/Layout.tsx` + `Layout.module.css`
메인 레이아웃 컴포넌트입니다.

**구조:**
```
┌─────────────────────────────────────────┐
│ Sidebar │         Header                │
│         │───────────────────────────────│
│         │                               │
│         │         Content               │
│         │         (Outlet)              │
│         │                               │
└─────────────────────────────────────────┘
```

**기능:**
- Sidebar 고정 (width: 260px)
- Header 고정 (height: 60px)
- 반응형: 768px 이하에서 햄버거 메뉴

### `layout/Sidebar.tsx` + `Sidebar.module.css`
사이드바 네비게이션 컴포넌트입니다.

**메뉴 구조:**
| 메뉴 | 경로 | 하위 메뉴 |
|------|------|----------|
| Dashboard | / | - |
| Students | /students | All Students, Add Student |
| Courses | /courses | All Courses, Add Course |
| Grades | /grades | All Grades, Add Grade |
| Analytics | /analytics | - |

**기능:**
- 계층형 메뉴 (접기/펼치기)
- NavLink로 활성 메뉴 하이라이트
- 반응형: 768px 이하에서 슬라이드 인/아웃

### `layout/Header.tsx` + `Header.module.css`
헤더 컴포넌트입니다.

**기능:**
- 타이틀 표시
- 사용자 이름 표시
- 로그아웃 버튼
- 반응형: 768px 이하에서 햄버거 메뉴 버튼

---

## src/pages/ - 페이지 컴포넌트

### `pages/index.ts`
페이지 컴포넌트 내보내기 배럴 파일입니다.

### `pages/Dashboard.tsx` + `Dashboard.module.css`
대시보드 (홈) 페이지입니다.

**표시 정보:**
- 총 학생 수
- 총 과목 수
- 활성 수강 수
- 평균 성적
- 등급 분포 차트 (A/B/C/D/F)

**API 호출:**
- `analyticsService.getDashboardStats()`
- `analyticsService.getGradeDistribution()`

### `pages/Students.tsx` + `Students.module.css`
학생 관리 페이지입니다.

**기능:**
- 학생 목록 테이블
- 검색 (이름, 학번, 이메일)
- 학생 추가 버튼
- 학생 상세 보기
- 학생 삭제 (확인 모달)

**API 호출:**
- `studentsService.getAll()`
- `studentsService.delete()`

### `pages/Courses.tsx` + `Courses.module.css`
과목 관리 페이지입니다.

**기능:**
- 과목 목록 테이블
- 검색 (과목명, 과목 코드)
- 과목 추가 버튼
- 과목 상세 보기
- 과목 삭제 (확인 모달)

**API 호출:**
- `coursesService.getAll()`
- `coursesService.delete()`

### `pages/Grades.tsx` + `Grades.module.css`
성적 관리 페이지입니다.

**기능:**
- 성적 목록 테이블
- 학기별 필터링
- 성적 추가 버튼
- 등급별 색상 표시 (A: 녹색, B: 파랑, C: 주황, D: 빨강, F: 짙은 빨강)

**API 호출:**
- `gradesService.getAll()`

### `pages/Login.tsx` + `Login.module.css`
로그인 페이지입니다.

**기능:**
- 사용자명/비밀번호 입력
- 로그인 버튼
- 회원가입 링크
- 에러 메시지 표시

**API 호출:**
- `authService.login()`

### `pages/Register.tsx`
회원가입 페이지입니다. (Login.module.css 공유)

**기능:**
- 사용자명/이메일/이름/비밀번호 입력
- 비밀번호 확인
- 회원가입 버튼
- 로그인 링크
- 에러 메시지 표시

**API 호출:**
- `POST /api/v1/accounts/users/`

---

## 디자인 시스템 요약

### Arctic White 테마
- **배경**: 아이스 화이트 (#f8fafc)
- **모서리**: 직각 (0px)
- **그림자**: 부드러운 그림자 (0.15 opacity)
- **애니메이션**: Smooth Slide (0.3s ease-in-out)

### 반응형 전략 (Desktop First)
| 브레이크포인트 | 변경 사항 |
|----------------|----------|
| > 768px | 전체 레이아웃 |
| <= 768px | 사이드바 숨김, 햄버거 메뉴 |

### 폰트
- **영문**: Roboto (300-700)
- **한글**: Noto Sans KR (300-700)
- **폴백**: Arial, sans-serif

---

## 로컬 개발 환경 설정

```bash
# 1. 디렉토리 이동
cd Py-SMS/Frontend

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일에서 REACT_APP_API_URL 설정

# 4. 개발 서버 실행
npm start
```

**접속 URL:**
- http://localhost:3000

---

## 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# build/ 디렉토리에 정적 파일 생성
```

**Render.com 배포:**
1. New → Static Site 선택
2. GitHub 저장소 연결
3. Root Directory: `Py-SMS/Frontend`
4. Build Command: `npm install && npm run build`
5. Publish Directory: `build`
6. 환경 변수: `REACT_APP_API_URL` 설정

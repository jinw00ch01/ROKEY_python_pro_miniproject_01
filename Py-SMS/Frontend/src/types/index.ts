// User types
export interface User {
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

// Student types
export interface Student {
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

export interface StudentListItem {
  id: number;
  student_id: string;
  full_name: string;
  email: string;
}

// Course types
export interface Course {
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

export interface CourseListItem {
  id: number;
  course_code: string;
  name: string;
  credits: number;
  instructor?: string;
}

// Enrollment types
export type EnrollmentStatus = 'active' | 'completed' | 'dropped';

export interface Enrollment {
  id: number;
  student: StudentListItem;
  course: CourseListItem;
  enrolled_at: string;
  status: EnrollmentStatus;
}

// Grade types
export type GradeType = 'exam' | 'quiz' | 'assignment' | 'project' | 'midterm' | 'final';

export interface Grade {
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

export interface GradeListItem {
  id: number;
  student_name: string;
  course_name: string;
  score: number;
  max_score: number;
  percentage: number;
  letter_grade: string;
  grade_type: GradeType;
  semester: string;
}

// Analytics types
export interface DashboardStats {
  total_students: number;
  total_courses: number;
  active_enrollments: number;
  total_grades: number;
  average_grade: number;
}

export interface GradeDistribution {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}

// API Response types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

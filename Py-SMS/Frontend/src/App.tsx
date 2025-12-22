import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  Dashboard,
  Students,
  Courses,
  Grades,
  Login,
  Register,
  StudentForm,
  CourseForm,
  GradeForm,
  Enrollments,
  GradeStatistics,
  StudentPerformance,
  GradeDistribution,
  StudentPerformanceAnalytics,
  CourseStats,
} from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/new" element={<StudentForm />} />
          <Route path="students/:id" element={<Students />} />
          <Route path="students/performance" element={<StudentPerformance />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/new" element={<CourseForm />} />
          <Route path="courses/:id" element={<Courses />} />
          <Route path="enrollments" element={<Enrollments />} />
          <Route path="grades" element={<Grades />} />
          <Route path="grades/new" element={<GradeForm />} />
          <Route path="grades/:id" element={<Grades />} />
          <Route path="grades/statistics" element={<GradeStatistics />} />
          <Route path="analytics/grade-distribution" element={<GradeDistribution />} />
          <Route path="analytics/student-performance" element={<StudentPerformanceAnalytics />} />
          <Route path="analytics/course-stats" element={<CourseStats />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

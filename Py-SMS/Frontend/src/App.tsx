import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { Dashboard, Students, Courses, Grades, Login, Register } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/new" element={<Students />} />
          <Route path="students/:id" element={<Students />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/new" element={<Courses />} />
          <Route path="courses/:id" element={<Courses />} />
          <Route path="grades" element={<Grades />} />
          <Route path="grades/new" element={<Grades />} />
          <Route path="grades/:id" element={<Grades />} />
          <Route path="analytics" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

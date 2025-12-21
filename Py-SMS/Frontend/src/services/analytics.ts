import api from './api';
import { DashboardStats, GradeDistribution } from '../types';

export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/analytics/dashboard/');
    return response.data;
  },

  async getGradeDistribution(params?: {
    course_id?: number;
    semester?: string;
  }): Promise<GradeDistribution> {
    const response = await api.get<GradeDistribution>('/analytics/grades/distribution/', { params });
    return response.data;
  },

  async getStudentPerformance(studentId: number): Promise<{
    student_id: number;
    grades: Array<{
      course: string;
      score: number;
      max_score: number;
      percentage: number;
      letter_grade: string;
      semester: string;
    }>;
    average_percentage: number;
  }> {
    const response = await api.get('/analytics/students/performance/', {
      params: { student_id: studentId },
    });
    return response.data;
  },
};

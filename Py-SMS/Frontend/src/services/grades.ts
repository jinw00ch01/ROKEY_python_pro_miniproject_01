import api from './api';
import { Grade, GradeListItem, PaginatedResponse } from '../types';

export const gradesService = {
  async getAll(params?: {
    page?: number;
    student?: number;
    course?: number;
    semester?: string;
  }): Promise<PaginatedResponse<GradeListItem>> {
    const response = await api.get<PaginatedResponse<GradeListItem>>('/grades/', { params });
    return response.data;
  },

  async getById(id: number): Promise<Grade> {
    const response = await api.get<Grade>(`/grades/${id}/`);
    return response.data;
  },

  async create(data: Partial<Grade>): Promise<Grade> {
    const response = await api.post<Grade>('/grades/', data);
    return response.data;
  },

  async update(id: number, data: Partial<Grade>): Promise<Grade> {
    const response = await api.patch<Grade>(`/grades/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/grades/${id}/`);
  },

  async getByStudent(studentId: number): Promise<GradeListItem[]> {
    const response = await api.get<GradeListItem[]>('/grades/by_student/', {
      params: { student_id: studentId },
    });
    return response.data;
  },

  async getByCourse(courseId: number): Promise<GradeListItem[]> {
    const response = await api.get<GradeListItem[]>('/grades/by_course/', {
      params: { course_id: courseId },
    });
    return response.data;
  },
};

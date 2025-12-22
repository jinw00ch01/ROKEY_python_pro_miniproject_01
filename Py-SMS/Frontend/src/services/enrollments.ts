import api from './api';
import { Enrollment, PaginatedResponse } from '../types';

export const enrollmentsService = {
  async getAll(params?: { page?: number }): Promise<PaginatedResponse<Enrollment>> {
    const response = await api.get<PaginatedResponse<Enrollment>>('/courses/enrollments/', { params });
    return response.data;
  },

  async getById(id: number): Promise<Enrollment> {
    const response = await api.get<Enrollment>(`/courses/enrollments/${id}/`);
    return response.data;
  },

  async create(data: { student_id: number; course_id: number }): Promise<Enrollment> {
    const response = await api.post<Enrollment>('/courses/enrollments/', data);
    return response.data;
  },

  async update(id: number, data: { status: string }): Promise<Enrollment> {
    const response = await api.patch<Enrollment>(`/courses/enrollments/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/courses/enrollments/${id}/`);
  },
};

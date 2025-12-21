import api from './api';
import { Course, CourseListItem, Enrollment, PaginatedResponse } from '../types';

export const coursesService = {
  async getAll(params?: { page?: number; search?: string }): Promise<PaginatedResponse<CourseListItem>> {
    const response = await api.get<PaginatedResponse<CourseListItem>>('/courses/', { params });
    return response.data;
  },

  async getById(id: number): Promise<Course> {
    const response = await api.get<Course>(`/courses/${id}/`);
    return response.data;
  },

  async create(data: Partial<Course>): Promise<Course> {
    const response = await api.post<Course>('/courses/', data);
    return response.data;
  },

  async update(id: number, data: Partial<Course>): Promise<Course> {
    const response = await api.patch<Course>(`/courses/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/courses/${id}/`);
  },

  async getStudents(courseId: number): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>(`/courses/${courseId}/students/`);
    return response.data;
  },
};

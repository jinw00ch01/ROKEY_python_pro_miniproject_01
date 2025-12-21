import api from './api';
import { Student, StudentListItem, PaginatedResponse } from '../types';

export const studentsService = {
  async getAll(params?: { page?: number; search?: string }): Promise<PaginatedResponse<StudentListItem>> {
    const response = await api.get<PaginatedResponse<StudentListItem>>('/students/', { params });
    return response.data;
  },

  async getById(id: number): Promise<Student> {
    const response = await api.get<Student>(`/students/${id}/`);
    return response.data;
  },

  async create(data: Partial<Student>): Promise<Student> {
    const response = await api.post<Student>('/students/', data);
    return response.data;
  },

  async update(id: number, data: Partial<Student>): Promise<Student> {
    const response = await api.patch<Student>(`/students/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/students/${id}/`);
  },
};

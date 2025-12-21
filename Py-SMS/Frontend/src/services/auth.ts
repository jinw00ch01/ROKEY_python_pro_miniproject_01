import api from './api';
import { LoginCredentials, AuthTokens, User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await api.post<AuthTokens>('/auth/token/', credentials);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/accounts/users/me/');
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};

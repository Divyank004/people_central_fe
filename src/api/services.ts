import { apiService } from './index';
import type { User, LoginResponse, UserProfile } from '../types/auth';
import type { VacationReqResponse, VacationRequest, VacationsCount } from 'src/types/vacation';

class AuthService {
  // Login with email and password
  async login(credentials: User): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/auth/login', credentials);
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async getUserProfile(userId: number): Promise<UserProfile> {
    try {
      const response = await apiService.get<UserProfile>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  }

  async getVacationsCount(userId: number): Promise<VacationsCount[]> {
    try {
      const response = await apiService.get<VacationsCount[]>(`/users/${userId}/vacations/count`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  }

  async createVacationRequest(
    userId: number,
    vacationReqData: VacationRequest,
  ): Promise<VacationReqResponse> {
    try {
      const response = await apiService.post<VacationReqResponse>(
        `/users/${userId}/vacations`,
        vacationReqData,
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create vacation request:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();

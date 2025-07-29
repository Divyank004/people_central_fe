import { apiService } from './index'
import type { User, LoginResponse, UserProfile } from '../types/auth'
import type { VacationsCount } from 'src/types/absence'

class AuthService {
  // Login with email and password
  async login(credentials: User): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/auth/login', credentials)
      localStorage.setItem('token', response.data.access_token)
      return response.data
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  async getUserProfile(userId: number): Promise<UserProfile> {
    try {
      const response = await apiService.get<UserProfile>(`/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      throw error
    }
  }

  async getVacationsCount(userId: number): Promise<VacationsCount[]> {
    try {
      const response = await apiService.get<VacationsCount[]>(`/users/${userId}/vacations`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      throw error
    }
  }
}

export const authService = new AuthService()

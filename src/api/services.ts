import { apiService } from './index'
import type { User, LoginResponse } from '../types/auth'

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
}

export const authService = new AuthService()

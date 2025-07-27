export interface User {
  username: string
  password: string
}

export interface UserProfile {
  userId: number
  employeeId: number
  userName: string
  name: string
  orgName: string
  employeeRole: string
  noVacationDaysLeft: number
}

export interface LoginResponse {
  access_token: string
  userId: number
}

export interface ApiError {
  response?: {
    data?: {
      message: string
      errors?: Record<string, string[]>
    }
    status: number
  }
  message: string
}

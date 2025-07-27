export interface User {
  username: string
  password: string
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

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios'
import { navigateToLogin } from '../router/routerService';

class ApiService {
  private api: AxiosInstance
  constructor() {
    this.api = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) =>{
        console.warn('Unauthorized access - err', error)
        if (error.response.status === 401) {
          navigateToLogin()
          localStorage.removeItem('token')
          return error
      }
    }
    )
  }

  // Generic methods
  public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get(url, config)
  }

  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post(url, data, config)
  }

  public put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put(url, data, config)
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete(url, config)
  }

  public patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.patch(url, data, config)
  }
}

export const apiService = new ApiService()

function reject(error: ErrorOptions): unknown {
  throw new Error('Invalid credentials', error);
}

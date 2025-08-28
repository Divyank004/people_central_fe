import { apiService } from './index';
import type { User, LoginResponse, UserProfile } from '../types/auth';

/**
 * Authenticates a user with email and password credentials
 *
 * @param {User} credentials - User login credentials
 * @param {string} credentials.username - User's email address
 * @param {string} credentials.password - User's password
 *
 * @returns {Promise<LoginResponse>} Promise that resolves to login response with access token and user ID
 * @throws {Error} When authentication fails or network error occurs
 *
 * @example
 * ```typescript
 * const result = await login({
 *   username: 'user@example.com',
 *   password: 'password123'
 * });
 * console.log(result.access_token, result.userId);
 * ```
 */
export async function login(credentials: User): Promise<LoginResponse> {
  try {
    const response = await apiService.post<LoginResponse>('/auth/login', credentials);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error: unknown) {
    console.error('Login failed:', error);
    throw error;
  }
}

/**
 * Retrieves user profile information by user ID
 *
 * @param {number} userId - The unique identifier of the user
 *
 * @returns {Promise<UserProfile>} Promise that resolves to user profile data
 * @throws {Error} When user ID is invalid (null, undefined, or <= 0)
 * @throws {Error} When user is not found or network error occurs
 *
 * @example
 * ```typescript
 * const profile = await getUserProfile(123);
 * console.log(profile.name, profile.employeeRole);
 * ```
 */
export async function getUserProfile(userId: number): Promise<UserProfile> {
  if (!userId || userId <= 0) {
    throw new Error('Invalid user ID');
  }
  try {
    const response = await apiService.get<UserProfile>(`/users/${userId}`);
    return response.data;
  } catch (error: unknown) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
}

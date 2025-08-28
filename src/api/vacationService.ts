import { apiService } from './index';
import type { VacationReqResponse, VacationRequest, VacationsCount } from 'src/types/vacation';

/**
 * Retrieves number of vacation days taken by type for a specific user
 *
 * @param {number} userId - The unique identifier of the user
 *
 * @returns {Promise<VacationsCount[]>} Promise that resolves to an array of vacation counts grouped by type
 * @throws {Error} When user ID is invalid (null, undefined, or <= 0)
 * @throws {Error} When user is not found or network error occurs
 *
 * @example
 * ```typescript
 * const counts = await getVacationsCount(123);
 * counts.forEach(count => {
 *   console.log(`${count.vacationType}: ${count.noOfDaysTaken} days taken`);
 * });
 * ```
 *
 * @description
 * Returns vacation usage statistics including:
 * - PAID vacation days taken
 * - SICK vacation days taken
 * - UNPAID vacation days taken
 * - PENDING requests awaiting approval
 */
export async function getVacationsCount(userId: number): Promise<VacationsCount[]> {
  if (!userId || userId <= 0) {
    throw new Error('Invalid user ID');
  }
  try {
    const response = await apiService.get<VacationsCount[]>(`/users/${userId}/vacations/count`);
    return response.data;
  } catch (error: unknown) {
    console.error('Failed to fetch vacation counts:', error);
    throw error;
  }
}

/**
 * Creates a new vacation request for a user
 *
 * @param {number} userId - The unique identifier of the user creating the request
 * @param {VacationRequest} vacationReqData - The vacation request data
 * @param {string} vacationReqData.startDate - Start date of vacation (ISO string format)
 * @param {string} vacationReqData.endDate - End date of vacation (ISO string format)
 * @param {VacationType} vacationReqData.vacationType - Type of vacation (PAID, UNPAID, SICK, etc.)
 * @param {boolean} [vacationReqData.halfDay] - Whether this is a half-day request
 * @param {string} [vacationReqData.comments] - Optional comments or reason for vacation
 *
 * @returns {Promise<VacationReqResponse>} Promise that resolves to the created vacation request details
 * @throws {Error} When user ID is invalid (null, undefined, or <= 0)
 * @throws {Error} When vacation request data is invalid or conflicts with existing dates
 * @throws {Error} When network error occurs or server validation fails
 *
 * @example
 * ```typescript
 * const request = await createVacationRequest(123, {
 *   startDate: '2024-06-01',
 *   endDate: '2024-06-05',
 *   vacationType: 'PAID',
 *   halfDay: false,
 *   comments: 'Summer vacation'
 * });
 * console.log('Request created with ID:', request.id);
 * ```
 *
 * @description
 * Creates a vacation request that will be:
 * - Validated for date conflicts
 * - Checked against available vacation days
 * - Submitted for manager approval
 */
export async function createVacationRequest(
  userId: number,
  vacationReqData: VacationRequest,
): Promise<VacationReqResponse> {
  if (!userId || userId <= 0) {
    throw new Error('Invalid user ID');
  }
  try {
    const response = await apiService.post<VacationReqResponse>(
      `/users/${userId}/vacations`,
      vacationReqData,
    );
    return response.data;
  } catch (error: unknown) {
    console.error('Failed to create vacation request:', error);
    throw error;
  }
}

type VacationStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

interface Vacation {
  id: number;
  startDate: string;
  endDate: string;
  document?: string;
  comments?: string;
  duration: string;
  vacationType: VacationType;
  status: VacationStatus;
}

type VacationType = 'PAID' | 'UNPAID' | 'SICK' | 'PENDING' | 'MATERNITY';

interface VacationsCount {
  id: number;
  vacationType: VacationType;
  noOfDaysTaken: number;
}

interface VacationRequest {
  startDate: string;
  endDate: string;
  document?: string;
  vacationType: VacationType;
  comments?: string;
  halfDay?: boolean;
  replacementId?: number;
}

interface VacationReqResponse {
  id: number;
  vacationType?: VacationType;
  status?: VacationStatus;
}

export type {
  VacationStatus,
  Vacation,
  VacationsCount,
  VacationType,
  VacationRequest,
  VacationReqResponse,
};

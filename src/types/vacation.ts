type VacationStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

interface Vacation {
  id: number;
  fromDate: string;
  toDate: string;
  document: string;
  duration: string;
  vacationType: VacationType;
  status: VacationStatus;
}

type VacationType = 'PAID' | 'UNPAID' | 'SICK' | 'PENDING' | 'MATERNITY';
interface VacationsCount {
    id: number
    vacationType: VacationType
    noOfDaysTaken: number
}

interface VacationRequest {
  fromDate: string;
  toDate: string;
  document?: string;
  vacationType: VacationType;
  comments?: string;
  halfDay?: boolean;
}

export type {VacationStatus, Vacation, VacationsCount, VacationType, VacationRequest}

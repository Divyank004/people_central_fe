type AbsenceStatus = 'Approved' | 'Rejected' | 'Pending';

interface absenceType {
  id: number;
  fromDate: string;
  toDate: string;
  document: string;
  duration: string;
  leaveType: string;
  status: AbsenceStatus;
}

interface VacationsCount {
    id: number
    vacationType: 'PAID' | 'UNPAID' | 'SICK' | 'PENDING'
    noOfDaysTaken: number
}
export type {AbsenceStatus, absenceType, VacationsCount}

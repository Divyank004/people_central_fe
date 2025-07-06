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

export type {AbsenceStatus, absenceType}

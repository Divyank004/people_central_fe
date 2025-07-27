export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Employee {
  id: number;
  userId: number;
  orgName: string;
  username: string;
  name: string;
  vacations: number;
  year: number;
  role: string
}

export interface EmployeeDocument {
  id: number;
  filename: string;
}

export interface Vacations {
  id: number;
  vacationType: string;
  noOfDaysTaken: number;
}

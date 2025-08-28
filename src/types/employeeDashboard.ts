interface Todo {
  id: number;
  content: string;
}

interface Meta {
  totalCount: number;
}

interface Employee {
  id: number;
  userId: number;
  orgName: string;
  username: string;
  name: string;
  vacations: number;
  role: string;
}

interface EmployeeDocument {
  id: number;
  filename: string;
}

interface Vacations {
  id: number;
  vacationType: string;
  noOfDaysTaken: number;
}

export type { Todo, Meta, Employee, EmployeeDocument, Vacations };

interface User {
  username: string;
  password: string;
}

interface UserProfile {
  userId: number;
  employeeId: number;
  userName: string;
  name: string;
  orgName: string;
  employeeRole: string;
  noVacationDaysLeft: number;
}

interface LoginResponse {
  access_token: string;
  userId: number;
}

interface ApiError {
  response?: {
    data?: {
      message: string;
      errors?: Record<string, string[]>;
    };
    status: number;
  };
  message: string;
}

export type { User, LoginResponse, UserProfile, ApiError };

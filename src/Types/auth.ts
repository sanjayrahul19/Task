export interface User {
  email: string;
  password: string;
}

export interface AuthState {
  users: User[],  // Store all users
  currentUser: User|null,
  token: string | null;
  isAuthenticated: boolean;
  errorMessage: string|null;
  error: boolean;
}
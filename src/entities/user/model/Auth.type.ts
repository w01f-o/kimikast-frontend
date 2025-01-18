export interface AuthForm {
  email: string;
  name: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

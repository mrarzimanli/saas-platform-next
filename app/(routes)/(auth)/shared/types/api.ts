// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// User Registration Types
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  plan: string;
}

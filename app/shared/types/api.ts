// Generic Response Type
export interface ApiResponse<T> {
  message: string;
  data?: T;
  error?: string;
}

// Error Response
export interface ErrorResponse {
  message: string;
  status: number;
}

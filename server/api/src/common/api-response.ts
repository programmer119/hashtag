export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};

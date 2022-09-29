export type Response = {
  statusCode: number;
  headers?: { [key: string]: string };
} & (SuccessResponse | ErrorResponse);

export interface SuccessResponse {
  body?: string;
}

export interface ErrorResponse {
  error?: string;
}

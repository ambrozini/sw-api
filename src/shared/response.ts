import { StatusCodes } from "http-status-codes";

export type Response = SuccessResponse | ErrorResponse;

export interface SuccessResponse extends CommonResponse {
  body?: string;
}

export interface ErrorResponse extends CommonResponse {
  error?: string;
}
interface CommonResponse {
  statusCode: StatusCodes;
  headers?: { [key: string]: string };
}

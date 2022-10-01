import { StatusCodes } from "http-status-codes";

export type Response<T = null> = SuccessResponse<T> | ErrorResponse;

export type SuccessResponse<T> = CommonResponse & {
  body: T;
};

export interface ErrorResponse extends CommonResponse {
  body: string;
}
interface CommonResponse {
  statusCode: StatusCodes;
  headers?: { [key: string]: string };
}

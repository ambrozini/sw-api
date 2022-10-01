import { StatusCodes } from "http-status-codes";

export type Response<T = null> = ErrorResponse | SuccessResponse<T>;

export type SuccessResponse<T = null> = CommonResponse &
  (T extends null
    ? {
        body?: null;
      }
    : {
        body: T;
      });

export interface ErrorResponse extends CommonResponse {
  body: string;
}
interface CommonResponse {
  statusCode: StatusCodes;
  headers?: { [key: string]: string };
}

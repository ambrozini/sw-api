import { StatusCodes } from "http-status-codes";

export type Response<T = null> = ErrorResponse | SuccessResponse<T>;

export type SuccessResponse<T = null> = CommonResponse &
  (T extends null
    ? {
        body?: null;
      }
    : {
        body: string;
        headers: typeof jsonHeader & {
          [key: string]: string;
        };
      });

export interface ErrorResponse extends CommonResponse {
  body: string;
  headers: typeof textHeader & { [key: string]: string };
}
interface CommonResponse {
  statusCode: StatusCodes;
  headers?: { [key: string]: string };
}

export const jsonHeader = { "Content-Type": "application/json" } as const;
export const textHeader = { "Content-Type": "text/plain" } as const;

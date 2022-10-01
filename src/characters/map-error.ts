import { ErrorResponse, ErrorResult } from "@shared";
import { StatusCodes } from "http-status-codes";
import { CharacterServiceErrors } from "./model/errors";

export function mapError(
  error: ErrorResult<CharacterServiceErrors>
): ErrorResponse {
  switch (error?.errorCode) {
    case "ALREADY_EXISTS":
      return {
        statusCode: StatusCodes.CONFLICT,
        body: "Character with such name already exists",
      };
    case "VALIDATION_ERROR":
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: error.message,
      };

    case "NOT_EXISTS":
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: "Such character doesn't exists",
      };

    default:
      throw new Error("Unkown Error");
  }
}

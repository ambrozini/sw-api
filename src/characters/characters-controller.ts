import {
  Response,
  isActionResultFailure,
  ErrorResult,
  ErrorResponse,
} from "@shared";
import { StatusCodes } from "http-status-codes";

import * as service from "./characters-service";
import { Character } from "./model/character";
import { CharacterServiceErrors } from "./model/errors";

export const getAll = async (): Promise<Response> => {
  const characters = service.getAll();

  return {
    statusCode: 200,
    body: JSON.stringify({ characters }),
  };
};

export const create = async ({
  body: character,
}: {
  body: Character;
}): Promise<Response> => {
  try {
    const result = service.create(character);

    if (isActionResultFailure(result)) {
      return mapError(result);
    }

    return {
      statusCode: StatusCodes.CREATED,
      body: null,
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: "Something went wrong! Please contact administration",
    };
  }
};

export const deleteOne = async ({
  body,
}: {
  body: { name: string };
}): Promise<Response> => {
  const result = service.deleteOne(body.name);

  if (isActionResultFailure(result)) {
    return mapError(result);
  }

  return { statusCode: StatusCodes.NO_CONTENT, body: null };
};

function mapError(error: ErrorResult<CharacterServiceErrors>): ErrorResponse {
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

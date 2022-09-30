import { Response, isActionResultFailure, Error } from "@shared";
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
  const result = service.create(character);

  if (isActionResultFailure(result)) {
    return mapError(result);
  }

  return {
    statusCode: 201,
  };
};

function mapError(error: Error<CharacterServiceErrors>): Response {
  switch (error.errorCode) {
    case "ALREADY_EXISTS":
      return {
        statusCode: StatusCodes.CONFLICT,
        error: "Character with such name already exists",
      };
    case "VALIDATION_ERROR":
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        error: error.message,
      };
  }
}

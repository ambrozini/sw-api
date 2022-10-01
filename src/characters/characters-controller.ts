import { Response, isActionResultFailure } from "@shared";
import { StatusCodes } from "http-status-codes";

import * as service from "./characters-service";
import { mapError } from "./map-error";
import { Character } from "./model/character";

export const getAll = async (): Promise<Response<Character[]>> => {
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

  return { statusCode: StatusCodes.NO_CONTENT };
};

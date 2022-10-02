import { Response, isActionResultFailure } from "@shared";
import { StatusCodes } from "http-status-codes";

import * as service from "./characters-service";
import { mapError } from "./map-error";
import { Character } from "./model/character";

export const find = async ({
  queryStringParameters = {},
}: {
  queryStringParameters: { [key: string]: string };
}): Promise<Response<Character[]>> => {
  if (
    queryStringParameters?.limit &&
    isNaN(Number(queryStringParameters.limit))
  ) {
    return {
      statusCode: 400,
      body: "Limit has to be integer",
    };
  }

  if (
    queryStringParameters?.offset &&
    isNaN(Number(queryStringParameters.offset))
  ) {
    return {
      statusCode: 400,
      body: "Offset has to be integer",
    };
  }

  const options = {
    limit: queryStringParameters?.limit
      ? parseInt(queryStringParameters.limit, 10)
      : undefined,

    offset: queryStringParameters?.offset
      ? parseInt(queryStringParameters.offset, 10)
      : undefined,
  };

  const result = await service.find(options);

  if (isActionResultFailure(result)) {
    return mapError(result);
  }

  return {
    statusCode: 200,
    body: result.data,
  };
};

export const findOne = async ({
  pathParameters = {},
}: {
  pathParameters: { [key: string]: string };
}): Promise<Response<Character>> => {
  const result = await service.findOne(pathParameters.userName);

  if (isActionResultFailure(result)) {
    return mapError(result);
  }

  return {
    statusCode: 200,
    body: result.data,
  };
};

export const create = async ({
  body: character,
}: {
  body: Character;
}): Promise<Response> => {
  try {
    const result = await service.create(character);

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
  const result = await service.deleteOne(body.name);

  if (isActionResultFailure(result)) {
    return mapError(result);
  }

  return { statusCode: StatusCodes.NO_CONTENT };
};

export const update = async ({
  body: character,
}: {
  body: Character;
}): Promise<Response> => {
  try {
    const result = await service.update(character);

    if (isActionResultFailure(result)) {
      return mapError(result);
    }

    return {
      statusCode: StatusCodes.NO_CONTENT,
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: "Something went wrong! Please contact administration",
    };
  }
};

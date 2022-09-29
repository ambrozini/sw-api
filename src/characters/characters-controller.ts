import { Response, isActionResultFailure } from "@shared";
import service from "./characters-service";
import { Character } from "./model/character";
import { CharacterServiceErrors } from "./model/errors";

const getAll = async (): Promise<Response> => {
  const characters = service.getAll();

  return {
    statusCode: 200,
    body: JSON.stringify({ characters }),
  };
};

const create = async ({
  body: character,
}: {
  body: Character;
}): Promise<Response> => {
  const result = service.create(character);

  if (isActionResultFailure(result)) {
    return mapError(result.error);
  }

  return {
    statusCode: 201,
  };
};

export default { getAll, create };

function mapError(error: typeof CharacterServiceErrors[number]): Response {
  switch (error) {
    case "ALREADY_EXISTS":
      return {
        statusCode: 409,
        error: "Character with such name already exists",
      };
  }
}

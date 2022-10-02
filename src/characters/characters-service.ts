import { ActionResult, errorAction, successAction } from "@shared";
import { CharacterRepository } from "./character-repository";
import { Character, Episodes } from "./model/character";
import { CharacterServiceErrors } from "./model/errors";

export const find = async (options: {
  limit: number;
  offset: number;
}): Promise<ActionResult<Character[], CharacterServiceErrors>> => {
  const repository = await CharacterRepository.getInstance();

  const results = await repository.find(options);

  return successAction(results);
};

export const create = async (
  character: Character
): Promise<ActionResult<null, CharacterServiceErrors>> => {
  const repository = await CharacterRepository.getInstance();

  if (await repository.exists(character.name)) {
    return errorAction("ALREADY_EXISTS");
  }

  if (!character.name) {
    return errorAction("VALIDATION_ERROR", "Name doesn't exists");
  }

  if (!character.episodes) {
    return errorAction("VALIDATION_ERROR", "Episodes list doesn't exists");
  }

  if (character.episodes.length === 0) {
    return errorAction(
      "VALIDATION_ERROR",
      "Character have to be at least in one episode"
    );
  }

  if (
    character.episodes.some(
      (episode) => !Object.values(Episodes).includes(episode)
    )
  ) {
    return errorAction("VALIDATION_ERROR", "Such episode doesn't exist");
  }

  await repository.create(character);

  return successAction();
};

export const deleteOne = async (
  name: string
): Promise<ActionResult<null, CharacterServiceErrors>> => {
  const repository = await CharacterRepository.getInstance();

  if (!name) {
    return errorAction("VALIDATION_ERROR", "Name doesn't exists");
  }

  if (!(await repository.exists(name))) {
    return errorAction("NOT_EXISTS");
  }

  await repository.delete(name);

  return successAction();
};

export const update = async (
  character: Character
): Promise<ActionResult<null, CharacterServiceErrors>> => {
  const repository = await CharacterRepository.getInstance();

  if (!character.name) {
    return errorAction("VALIDATION_ERROR", "Name doesn't exists");
  }

  if (!character.episodes) {
    return errorAction("VALIDATION_ERROR", "Episodes list doesn't exists");
  }

  if (character.episodes.length === 0) {
    return errorAction(
      "VALIDATION_ERROR",
      "Character have to be at least in one episode"
    );
  }

  if (
    character.episodes.some(
      (episode) => !Object.values(Episodes).includes(episode)
    )
  ) {
    return errorAction("VALIDATION_ERROR", "Such episode doesn't exist");
  }

  if (!(await repository.exists(character.name))) {
    return errorAction("NOT_EXISTS");
  }

  repository.update(character);

  return successAction();
};

export const findOne = async (
  userName: string
): Promise<ActionResult<Character, CharacterServiceErrors>> => {
  if (!userName) {
    return errorAction<CharacterServiceErrors>(
      "VALIDATION_ERROR",
      "No username"
    );
  }

  const repository = await CharacterRepository.getInstance();

  const result = await repository.findOne(userName);

  if (!result) {
    return errorAction("NOT_EXISTS");
  }

  return successAction(result);
};

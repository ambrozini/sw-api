import { ActionResult, errorAction, successAction } from "@shared";
import { CharacterRepository } from "./character-repository";
import { Character, Episodes } from "./model/character";
import { CharacterServiceErrors } from "./model/errors";

export const find = (options: {
  limit: number;
  offset: number;
}): ActionResult<Character[], CharacterServiceErrors> => {
  const repository = CharacterRepository.getInstance();

  const results = repository.find(options);

  return successAction(results);
};

export const create = (
  character: Character
): ActionResult<null, CharacterServiceErrors> => {
  const repository = CharacterRepository.getInstance();

  if (
    repository.exists(
      (existingCharacter: Character) =>
        existingCharacter.name === character.name
    )
  ) {
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

  repository.create(character);

  return successAction();
};

export const deleteOne = (
  name: string
): ActionResult<null, CharacterServiceErrors> => {
  const repository = CharacterRepository.getInstance();

  if (!name) {
    return errorAction("VALIDATION_ERROR", "Name doesn't exists");
  }

  if (!repository.exists((character) => character.name === name)) {
    return errorAction("NOT_EXISTS");
  }

  repository.delete(name);

  return successAction();
};

export const update = (
  character: Character
): ActionResult<null, CharacterServiceErrors> => {
  const repository = CharacterRepository.getInstance();

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

  if (
    !repository.exists(
      (currentCharacter) => currentCharacter.name === character.name
    )
  ) {
    return errorAction("NOT_EXISTS");
  }

  repository.update(character);

  return successAction();
};
export function findOne(
  userName: string
): ActionResult<Character, CharacterServiceErrors> {
  if (!userName) {
    return errorAction<CharacterServiceErrors>(
      "VALIDATION_ERROR",
      "No username"
    );
  }

  const repository = CharacterRepository.getInstance();

  const result = repository.findOne(userName);

  if (!result) {
    return errorAction("NOT_EXISTS");
  }

  return successAction(result);
}

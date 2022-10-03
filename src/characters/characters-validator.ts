import { errorAction, Validator } from "@shared";
import { Character, Episodes } from "./model/character";
import { CharacterServiceErrors } from "./model/errors";

export const commonValidator: Validator<Character, CharacterServiceErrors> = (
  character: Character
) => {
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

  return null;
};

import { ActionResult, errorAction, successAction } from "@shared";
import { Character, Episodes } from "./model/character";
import { CharacterServiceErrors } from "./model/errors";

const characters: Character[] = [
  {
    name: "Luke Skywalker",
    episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
  },
  {
    name: "Darth Vader",
    episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
  },
  {
    name: "Han Solo",
    episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
  },
  {
    name: "Leia Organa",
    episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
    planet: "Alderaan",
  },
  {
    name: "Wilhuff Tarkin",
    episodes: [Episodes.NEWHOPE],
  },
  {
    name: "C-3PO",
    episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
  },
  {
    name: "R2-D2",
    episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
  },
];

export const getAll = (): Character[] => {
  return [...characters];
};

export const create = (
  character: Character
): ActionResult<null, CharacterServiceErrors> => {
  const characterList = getAll();

  if (
    characterList.some(
      (existingCharacter) => existingCharacter.name === character.name
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

  characterList.push(character);

  return successAction();
};

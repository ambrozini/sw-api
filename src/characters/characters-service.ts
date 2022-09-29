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

const getAll = (): Character[] => {
  return [...characters];
};

const create = (
  character: Character
): ActionResult<null, typeof CharacterServiceErrors> => {
  if (
    characters.some(
      (existingCharacter) => existingCharacter.name === character.name
    )
  ) {
    return errorAction("ALREADY_EXISTS");
  }

  characters.push(character);

  return successAction();
};

export default { getAll, create };

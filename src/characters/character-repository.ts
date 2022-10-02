import { drop, take } from "lodash";
import { Character, Episodes } from "./model/character";

export class CharacterRepository {
  private static instance: CharacterRepository;

  private characters: Character[] = [];

  private constructor() {
    this.clearData();
  }

  static getInstance(): CharacterRepository {
    if (!this.instance) {
      this.instance = new CharacterRepository();
    }

    return this.instance;
  }

  clearData() {
    this.characters = [
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
  } // TODO remove when switching into real db

  find({
    limit = 5,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }): Character[] {
    return take(drop([...this.characters], offset), limit);
  }

  findOne(userName: string): Character | undefined {
    return this.characters.find((character) => character.name === userName);
  }

  exists(predicate: (character: Character) => boolean): boolean {
    return this.characters.some((character) => predicate(character));
  }

  create(character: Character) {
    this.characters.push(character);
  }

  delete(name: string) {
    this.characters = this.characters.filter(
      (character) => character.name !== name
    );
  }

  update(characterToUpdate: Character) {
    this.characters = [
      ...this.characters.filter(
        (character) => character.name !== characterToUpdate.name
      ),
      characterToUpdate,
    ];
  }
}

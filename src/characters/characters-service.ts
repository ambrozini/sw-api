import { Character, Episodes } from "./model/character";

const characters = [
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

export default { getAll };

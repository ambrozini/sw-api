export enum Episodes {
  NEWHOPE = "NEWHOPE",
  EMPIRE = "EMPIRE",
  JEDI = "JEDI",
}

type Planet = string;

export interface Character {
  name: string;
  episodes: Episodes[];
  planet?: Planet;
}

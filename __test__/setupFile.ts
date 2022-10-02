import { Episodes } from "../src/characters/model/character";
import { getDbClient } from "../src/shared/get-db-client";

beforeAll(async () => {
  await getDbClient().connect();
});

beforeEach(async () => {
  await getDbClient().db("sw").collection("characters").deleteMany({});
  await getDbClient()
    .db("sw")
    .collection("characters")
    .insertMany([
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
    ]);
});

afterAll(async () => {
  await getDbClient().close();
});

import { MongoClient } from "mongodb";
import { Episodes } from "src/characters/model/character";

const client: MongoClient = new MongoClient(process.env.MONGO_URI);

export const seedDb = async () => {
  await client.db("sw").collection("characters").deleteMany({});
  const result = await client
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

  console.log(result);
};

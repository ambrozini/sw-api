import { Character } from "./model/character";

import { MongoClient } from "mongodb";

export class CharacterRepository {
  private static instance: CharacterRepository;

  private client: MongoClient;

  private constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
  }

  static async getInstance(): Promise<CharacterRepository> {
    if (!this.instance) {
      this.instance = new CharacterRepository();
    }

    await this.instance.client.connect();

    return this.instance;
  }

  find({
    limit = 5,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }): Promise<Character[]> {
    console.log(limit);
    console.log(offset);

    return (
      this.client
        .db("sw")
        .collection("characters")
        // .find<Character>({ skip: offset, limit, _id: false })
        .find<Character>({ _id: false })
        .toArray()
    );
  }

  findOne(name: string): Promise<Character | null> {
    return this.client.db("sw").collection("characters").findOne<Character>({
      name,
      _id: false,
    });
  }

  async exists(name: string): Promise<boolean> {
    const count = await this.client
      .db("sw")
      .collection("characters")
      .countDocuments({
        name,
      });

    console.log(name);

    return count === 1;
  }

  async create(character: Character): Promise<void> {
    await this.client.db("sw").collection("characters").insertOne(character);
  }

  async delete(name: string): Promise<void> {
    await this.client.db("sw").collection("characters").deleteOne({ name });
  }

  async update(characterToUpdate: Character): Promise<void> {
    await this.client
      .db("sw")
      .collection("characters")
      .updateOne({ name: characterToUpdate.name }, characterToUpdate);
  }
}

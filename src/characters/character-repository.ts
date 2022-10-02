import { Character } from "./model/character";

import { MongoClient } from "mongodb";
import { getDbClient } from "src/shared/get-db-client";

export class CharacterRepository {
  private static instance: CharacterRepository;

  private client: MongoClient;

  private constructor() {
    this.client = getDbClient();
  }

  static async getInstance(): Promise<CharacterRepository> {
    if (!this.instance) {
      this.instance = new CharacterRepository();
    }

    await this.instance.client.connect();

    return this.instance;
  }

  async find({
    limit = 5,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }): Promise<Character[]> {
    return this.client
      .db("sw")
      .collection("characters")
      .find<Character>({}, { projection: { _id: 0 } })
      .skip(offset)
      .limit(limit)
      .toArray();
  }

  async findOne(name: string): Promise<Character | null> {
    return this.client
      .db("sw")
      .collection("characters")
      .findOne<Character>({ name }, { projection: { _id: 0 } });
  }

  async exists(name: string): Promise<boolean> {
    const count = await this.client
      .db("sw")
      .collection("characters")
      .countDocuments({
        name,
      });

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
      .replaceOne({ name: characterToUpdate.name }, characterToUpdate);
  }
}

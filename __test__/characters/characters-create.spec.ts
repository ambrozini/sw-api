import { ErrorResponse, HttpEvent, SuccessResponse } from "@shared";
import { noop } from "lodash";
import { Character, Episodes } from "src/characters/model/character";
import { create } from "../../src/characters/handler";
import * as service from "../../src/characters/characters-service";
import { CharacterRepository } from "src/characters/character-repository";
import { findCharacter } from "./helpers/findCharacter";

describe("Characters Integration Tests - create", () => {
  beforeEach(() => {
    CharacterRepository.getInstance().clearData();
  });

  describe("with valid data", () => {
    let response: SuccessResponse;

    beforeEach(async () => {
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            name: "Master Yoda",
            episodes: [Episodes.EMPIRE, Episodes.JEDI],
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as SuccessResponse;
    });

    it("should return successfull response", () => {
      expect(response.statusCode).toEqual(201);
    });

    it("should add character to database", async () => {
      const character = await findCharacter("Master Yoda");
      expect(character).toMatchInlineSnapshot(`
        {
          "episodes": [
            "EMPIRE",
            "JEDI",
          ],
          "name": "Master Yoda",
        }
      `);
    });
  });

  describe("with repetition data", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            name: "Luke Skywalker",
            episodes: [Episodes.NEWHOPE, Episodes.JEDI],
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as ErrorResponse;
    });

    it("should return status code 409", async () => {
      expect(response.statusCode).toEqual(409);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual("Character with such name already exists");
    });

    it("should not change existing character", async () => {
      const character = await findCharacter("Luke Skywalker");
      expect(character).toMatchInlineSnapshot(`
        {
          "episodes": [
            "NEWHOPE",
            "EMPIRE",
            "JEDI",
          ],
          "name": "Luke Skywalker",
        }
      `);
    });
  });

  describe("without a name", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            episodes: [Episodes.NEWHOPE],
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as ErrorResponse;
    });

    it("should return error code 400", async () => {
      expect(response.statusCode).toEqual(400);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual(`Name doesn't exists`);
    });
  });

  describe("with empty list of episodes", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            name: "Master Yoda",
            episodes: [],
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as ErrorResponse;
    });

    it("should return error code 400", async () => {
      expect(response.statusCode).toEqual(400);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual(
        "Character have to be at least in one episode"
      );
    });

    it("should not add character", async () => {
      const character = await findCharacter("Master Yoda");
      expect(character).toEqual("Such character doesn't exists");
    });
  });

  describe("with not existing episode", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            name: "Master Yoda",
            episodes: ["Not_Episode"],
          },
        } as HttpEvent<unknown> as HttpEvent<Character>,
        null,
        noop
      )) as ErrorResponse;
    });

    it("should return error code 400", async () => {
      expect(response.statusCode).toEqual(400);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual("Such episode doesn't exist");
    });

    it("should not add character", async () => {
      const character = await findCharacter("Master Yoda");
      expect(character).toEqual("Such character doesn't exists");
    });
  });

  describe("without list of episodes", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            name: "Master Yoda",
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as ErrorResponse;
    });

    it("should return error code 400", async () => {
      expect(response.statusCode).toEqual(400);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual("Episodes list doesn't exists");
    });

    it("should not add character", async () => {
      const character = await findCharacter("Master Yoda");
      expect(character).toEqual("Such character doesn't exists");
    });
  });

  describe("when unkown error will be thrown from the service", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      jest.spyOn(service, "create").mockImplementation(() => {
        throw new Error("Error");
      });
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            name: "Master Yoda",
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as ErrorResponse;
    });

    it("should return error code 500", async () => {
      expect(response.statusCode).toEqual(500);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual(
        "Something went wrong! Please contact administration"
      );
    });

    it("should not add character", async () => {
      const character = await findCharacter("Master Yoda");
      expect(character).toEqual("Such character doesn't exists");
    });
  });
});

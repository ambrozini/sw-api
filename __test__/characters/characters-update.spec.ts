import { ErrorResponse, HttpEvent, SuccessResponse } from "@shared";
import { noop } from "lodash";
import { Character, Episodes } from "src/characters/model/character";
import { update } from "../../src/characters/handler";
import * as service from "../../src/characters/characters-service";
import { findCharacter } from "./helpers/findCharacter";
import { CharacterRepository } from "src/characters/character-repository";

describe("Characters Integration Tests - update", () => {
  beforeEach(() => {
    CharacterRepository.getInstance().clearData();
  });

  describe("with valid data", () => {
    let response: SuccessResponse;

    beforeEach(async () => {
      response = (await update(
        {
          httpMethod: "PUT",
          body: {
            name: "Luke Skywalker",
            episodes: [Episodes.EMPIRE],
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as SuccessResponse;
    });

    it("should return successfull response", () => {
      expect(response.statusCode).toEqual(204);
    });

    it("should update character in database", async () => {
      expect(await findCharacter("Luke Skywalker")).toMatchInlineSnapshot(`
        {
          "episodes": [
            "EMPIRE",
          ],
          "name": "Luke Skywalker",
        }
      `);
    });
  });

  describe("without a name", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await update(
        {
          httpMethod: "PUT",
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

  describe("with non existing character", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await update(
        {
          httpMethod: "PUT",
          body: {
            name: "Master Yoda",
            episodes: [Episodes.NEWHOPE],
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as ErrorResponse;
    });

    it("should return error code 400", async () => {
      expect(response.statusCode).toEqual(404);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual("Such character doesn't exists");
    });
  });

  describe("without list of episodes", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await update(
        {
          httpMethod: "PUT",
          body: {
            name: "Luke Skywalker",
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

  describe("with not existing episode", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await update(
        {
          httpMethod: "POST",
          body: {
            name: "Luke Skywalker",
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

  describe("when unkown error will be thrown from the service", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      jest.spyOn(service, "update").mockImplementation(() => {
        throw new Error("Error");
      });
      response = (await update(
        {
          httpMethod: "PUT",
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
  });
});

import { ErrorResponse, HttpEvent, SuccessResponse } from "@shared";
import { noop } from "lodash";
import { Character, Episodes } from "src/characters/model/character";
import { create } from "../../src/characters/handler";
import * as service from "../../src/characters/characters-service";

describe("Characters Integration Tests - create", () => {
  describe("with valid data", () => {
    let response: SuccessResponse;
    it("should return successfull response", async () => {
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
      expect(response.statusCode).toEqual(201);
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
            episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
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
  });
});

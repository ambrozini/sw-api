import { ErrorResponse, HttpEvent, SuccessResponse } from "@shared";
import { noop } from "lodash";
import { Character } from "src/characters/model/character";
import { create } from "../src/characters/handler";

describe("Characters Integration Tests", () => {
  describe("create with valid data", () => {
    let response: SuccessResponse;
    it("should return successfull response", async () => {
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
      )) as SuccessResponse;
      expect(response.statusCode).toEqual(201);
    });
  });

  describe("create with repetition data", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            name: "Luke Skywalker",
            episodes: [],
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
      expect(response.error).toEqual("Character with such name already exists");
    });
  });

  describe("create with invalid data", () => {
    let response: ErrorResponse;

    it("should return error code 400", async () => {
      response = (await create(
        {
          httpMethod: "POST",
          body: {
            episodes: [],
          },
        } as HttpEvent<Character>,
        null,
        noop
      )) as ErrorResponse;
      expect(response.statusCode).toEqual(400);
    });
  });
});

import { ErrorResponse, HttpEvent, SuccessResponse } from "@shared";
import { noop } from "lodash";
import { Character, Episodes } from "src/characters/model/character";
import { update } from "../../src/characters/handler";
import * as service from "../../src/characters/characters-service";

describe("Characters Integration Tests - update", () => {
  describe("with valid data", () => {
    let response: SuccessResponse;
    it("should return successfull response", async () => {
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
      expect(response.statusCode).toEqual(204);
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

  describe("with empty list of episodes", () => {
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
  });

  describe("without not existing character", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
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

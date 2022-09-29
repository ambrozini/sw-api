import {
  errorAction,
  ErrorResponse,
  Response,
  successAction,
  SuccessResponse,
} from "@shared";
import controller from "./characters-controller";
import { Episodes } from "./model/character";
jest.mock("./characters-service", () => {
  return {
    default: {
      getAll: () => [
        {
          name: "Luke Skywalker",
          episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
        },
        {
          name: "Darth Vader",
          episodes: [Episodes.NEWHOPE, Episodes.EMPIRE, Episodes.JEDI],
        },
      ],
      create: jest.fn(),
    },
  };
});

import serviceMock from "./characters-service";
import { CharacterServiceErrors } from "./model/errors";

describe("Characters Service", () => {
  describe("getAll", () => {
    let result: Response;

    beforeEach(async () => {
      result = await controller.getAll();
    });

    it("should return OK status code", () => {
      expect(result.statusCode).toEqual(200);
    });

    it("should return list of characters in body", () => {
      expect((result as SuccessResponse).body).toMatchInlineSnapshot(
        `"{"characters":[{"name":"Luke Skywalker","episodes":["NEWHOPE","EMPIRE","JEDI"]},{"name":"Darth Vader","episodes":["NEWHOPE","EMPIRE","JEDI"]}]}"`
      );
    });
  });

  describe("create", () => {
    describe("successful", () => {
      let result: Response;

      beforeEach(async () => {
        (serviceMock.create as jest.Mock).mockReturnValue(successAction());
        result = await controller.create({
          body: {
            name: "Master Yoda",
            episodes: [Episodes.EMPIRE, Episodes.JEDI],
          },
        });
      });

      it("should return 'OK' status code", () => {
        expect(result.statusCode).toEqual(201);
      });
    });

    describe("unsuccessfult because of repetition", () => {
      let result: Response;

      beforeEach(async () => {
        (serviceMock.create as jest.Mock).mockReturnValue(
          errorAction<typeof CharacterServiceErrors>("ALREADY_EXISTS")
        );
        result = await controller.create({
          body: {
            name: "Master Yoda",
            episodes: [Episodes.EMPIRE, Episodes.JEDI],
          },
        });
      });

      it("should return 'Conflict' status code", () => {
        expect(result.statusCode).toEqual(409);
      });

      it("should return error message", () => {
        expect((result as ErrorResponse).error).toEqual(
          "Character with such name already exists"
        );
      });
    });
  });
});

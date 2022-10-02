import { HttpEvent, SuccessResponse } from "@shared";
import { findOne } from "../../src/characters/handler";
import { noop } from "lodash";
import { Character } from "src/characters/model/character";

describe("Characters Integration Tests - find", () => {
  describe("with valid request", () => {
    let response: SuccessResponse<Character>;

    beforeEach(async () => {
      response = (await findOne(
        {
          httpMethod: "GET",
          pathParameters: {
            userName: "Luke Skywalker",
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character>;
    });
    it("should return successfull response", () => {
      expect(response.statusCode).toEqual(200);
    });

    it("should return Luke Skywalker character", () => {
      expect(response.body).toMatchInlineSnapshot(`
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

  describe("without user name", () => {
    let response: SuccessResponse<Character>;

    beforeEach(async () => {
      response = (await findOne(
        {
          httpMethod: "GET",
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character>;
    });
    it("should return successfull response", () => {
      expect(response.statusCode).toEqual(400);
    });

    it("should return Luke Skywalker character", () => {
      expect(response.body).toEqual("No username");
    });
  });

  describe("when such user name doesn't exist", () => {
    let response: SuccessResponse<Character>;

    beforeEach(async () => {
      response = (await findOne(
        {
          httpMethod: "GET",
          pathParameters: {
            userName: "Frodo Baggins",
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character>;
    });
    it("should return successfull response", () => {
      expect(response.statusCode).toEqual(404);
    });

    it("should return Luke Skywalker character", () => {
      expect(response.body).toEqual("Such character doesn't exists");
    });
  });
});

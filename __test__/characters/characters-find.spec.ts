import { HttpEvent, SuccessResponse } from "@shared";
import { find } from "../../src/characters/handler";
import { noop } from "lodash";
import { Character } from "src/characters/model/character";

describe("Characters Integration Tests - find", () => {
  describe("with default limitation", () => {
    let response: SuccessResponse<Character[]>;

    beforeEach(async () => {
      response = (await find(
        {
          httpMethod: "GET",
        } as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character[]>;
    });
    it("should return successfull response", () => {
      expect(response.statusCode).toEqual(200);
    });

    it("should return 5 entries", () => {
      expect(response.body.length).toEqual(5);
    });

    it("should return first 5 entries", () => {
      expect(response.body).toMatchSnapshot();
    });
  });

  describe("with limit 2", () => {
    let response: SuccessResponse<Character[]>;

    beforeEach(async () => {
      response = (await find(
        {
          httpMethod: "GET",
          queryStringParameters: {
            limit: "2",
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character[]>;
    });
    it("should return successfull response", () => {
      expect(response.statusCode).toEqual(200);
    });

    it("should return 2 entries", () => {
      expect(response.body.length).toEqual(2);
    });
  });

  describe("with no number limit", () => {
    let response: SuccessResponse<Character[]>;

    beforeEach(async () => {
      response = (await find(
        {
          httpMethod: "GET",
          queryStringParameters: {
            limit: "no_number",
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character[]>;
    });
    it("should return 400 status code", () => {
      expect(response.statusCode).toEqual(400);
    });

    it("should return error message", () => {
      expect(response.body).toEqual("Limit has to be integer");
    });
  });

  describe("with offset of 2", () => {
    let response: SuccessResponse<Character[]>;

    beforeEach(async () => {
      response = (await find(
        {
          httpMethod: "GET",
          queryStringParameters: {
            offset: "2",
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character[]>;
    });
    it("should return successfull response", () => {
      expect(response.statusCode).toEqual(200);
    });

    it("should return 5 entries", () => {
      expect(response.body.length).toEqual(5);
    });

    it("should return entries between 2 and 7", () => {
      expect(response.body).toMatchSnapshot();
    });
  });

  describe("with no number offset", () => {
    let response: SuccessResponse<Character[]>;

    beforeEach(async () => {
      response = (await find(
        {
          httpMethod: "GET",
          queryStringParameters: {
            offset: "no_number",
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character[]>;
    });
    it("should return 400 error code", () => {
      expect(response.statusCode).toEqual(400);
    });

    it("should return error message", () => {
      expect(response.body).toEqual("Offset has to be integer");
    });
  });

  describe("read two pages", () => {
    let firstPageResponse: SuccessResponse<Character[]>;
    let secondPageResponse: SuccessResponse<Character[]>;

    beforeEach(async () => {
      firstPageResponse = (await find(
        {
          httpMethod: "GET",
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character[]>;

      secondPageResponse = (await find(
        {
          httpMethod: "GET",
          queryStringParameters: {
            offset: firstPageResponse.body.length,
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<Character[]>;
    });

    it("should return first page", () => {
      expect(firstPageResponse.body).toMatchSnapshot();
    });

    it("should return second page", () => {
      expect(secondPageResponse.body).toMatchSnapshot();
    });
  });
});

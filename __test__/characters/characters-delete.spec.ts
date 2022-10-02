import { HttpEvent, SuccessResponse, ErrorResponse } from "@shared";
import { deleteOne } from "../../src/characters/handler";
import { noop } from "lodash";
import { findCharacter } from "./helpers/findCharacter";

describe("Characters Integration Tests - delete", () => {
  describe("with valid name", () => {
    let response: SuccessResponse<null>;

    beforeEach(async () => {
      response = (await deleteOne(
        {
          httpMethod: "DELETE",
          body: {
            name: "Darth Vader",
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as SuccessResponse<null>;
    });

    it("should return successfull response", async () => {
      expect(response.statusCode).toEqual(204);
    });

    it("should remove character from database", async () => {
      expect(await findCharacter("Darth Vader")).toBeNull();
    });
  });

  describe("without name", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await deleteOne(
        {
          httpMethod: "DELETE",
          body: {},
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as ErrorResponse;
    });

    it("should return 400 error code", async () => {
      expect(response.statusCode).toEqual(400);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual("Name doesn't exists");
    });
  });

  describe("when character does not exist", () => {
    let response: ErrorResponse;

    beforeEach(async () => {
      response = (await deleteOne(
        {
          httpMethod: "DELETE",
          body: {
            name: "Frodo Baggins",
          },
        } as unknown as HttpEvent<null>,
        null,
        noop
      )) as ErrorResponse;
    });
    it("should return 404 error code", async () => {
      expect(response.statusCode).toEqual(404);
    });

    it("should return error message", async () => {
      expect(response.body).toEqual("Such character doesn't exists");
    });
  });
});

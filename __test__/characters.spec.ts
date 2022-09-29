import { HttpEvent, Response } from "@shared";
import { noop } from "lodash";
import { Character } from "src/characters/model/character";
import { create } from "../src/characters/handler";

describe("Characters Integration Tests", () => {
  describe("create", () => {
    let response: Response;
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
      )) as Response;
      expect(response).toBeDefined();
    });
  });
});

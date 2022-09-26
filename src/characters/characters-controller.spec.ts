import { Response } from "@shared/response";
import { getAll } from "./characters-controller";
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
    },
  };
});

describe("Characters Service", () => {
  describe("getAll", () => {
    let result: Response;

    beforeEach(async () => {
      result = await getAll();
    });

    it("should return OK status code", () => {
      expect(result.statusCode).toEqual(200);
    });

    it("should return list of characters in body", () => {
      expect(result.body).toMatchInlineSnapshot(
        `"{"characters":[{"name":"Luke Skywalker","episodes":["NEWHOPE","EMPIRE","JEDI"]},{"name":"Darth Vader","episodes":["NEWHOPE","EMPIRE","JEDI"]}]}"`
      );
    });
  });
});

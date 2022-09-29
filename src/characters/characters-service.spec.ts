import { ActionResult, Error } from "@shared";
import service from "./characters-service";
import { Character, Episodes } from "./model/character";
import { CharacterServiceErrors } from "./model/errors";
import { last } from "lodash";

describe("Characters Service", () => {
  describe("getAll", () => {
    let result: Character[];

    beforeEach(() => {
      result = service.getAll();
    });

    it("should return list of characters", () => {
      expect(result).toMatchInlineSnapshot(`
          [
            {
              "episodes": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI",
              ],
              "name": "Luke Skywalker",
            },
            {
              "episodes": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI",
              ],
              "name": "Darth Vader",
            },
            {
              "episodes": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI",
              ],
              "name": "Han Solo",
            },
            {
              "episodes": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI",
              ],
              "name": "Leia Organa",
              "planet": "Alderaan",
            },
            {
              "episodes": [
                "NEWHOPE",
              ],
              "name": "Wilhuff Tarkin",
            },
            {
              "episodes": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI",
              ],
              "name": "C-3PO",
            },
            {
              "episodes": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI",
              ],
              "name": "R2-D2",
            },
          ]
        `);
    });
  });

  describe("create", () => {
    describe("with valid data", () => {
      let result: ActionResult<void, typeof CharacterServiceErrors>;

      beforeEach(() => {
        result = service.create({
          name: "Master Yoda",
          episodes: [Episodes.EMPIRE, Episodes.JEDI],
        });
      });

      it("should result be successful", () => {
        expect(result.success).toEqual(true);
      });

      it("should add character as last element", () => {
        expect(last(service.getAll())).toMatchInlineSnapshot(`
          {
            "episodes": [
              "EMPIRE",
              "JEDI",
            ],
            "name": "Master Yoda",
          }
        `);
      });
    });

    describe("with not unique name", () => {
      let result: ActionResult<void, typeof CharacterServiceErrors>;

      beforeEach(() => {
        result = service.create({
          name: "Luke Skywalker",
          episodes: [],
        });
      });

      it("should result be successful", () => {
        expect(result.success).toEqual(false);
      });

      it("should add character as last element", () => {
        expect((result as Error<typeof CharacterServiceErrors>).error).toEqual(
          "ALREADY_EXISTS"
        );
      });
    });
  });
});

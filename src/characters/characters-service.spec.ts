import service from "./characters-service";
import { Character } from "./model/character";

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
});

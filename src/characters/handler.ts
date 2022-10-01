import { Response, middify } from "@shared";

import * as controller from "./characters-controller";
import { Character } from "./model/character";

export const getAll = middify<null, Response<Character[]>>(controller.getAll);

export const create = middify<Character, Response>(controller.create);

export const deleteOne = middify<{ name: string }, Response>(
  controller.deleteOne
);

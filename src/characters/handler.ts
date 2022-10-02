import { Response, middify } from "@shared";

import * as controller from "./characters-controller";
import { Character } from "./model/character";

export const find = middify<null, Response<Character[]>>(controller.find);

export const findOne = middify<null, Response<Character>>(controller.findOne);

export const create = middify<Character, Response>(controller.create);

export const deleteOne = middify<{ name: string }, Response>(
  controller.deleteOne
);

export const update = middify<Character, Response>(controller.update);

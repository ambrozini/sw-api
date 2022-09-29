import { Response, middify } from "@shared";
import controller from "./characters-controller";
import { Character } from "./model/character";

export const getAll = middify<void, Response>(controller.getAll);

export const create = middify<Character, Response>(controller.create);

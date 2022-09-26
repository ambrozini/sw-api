import middy from "@middy/core";
import { Response } from "@shared/response";
import { getAll as getAllController } from "./characters-controller";

export const getAll = middy<void, Response>(getAllController);

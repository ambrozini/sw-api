import { HttpEvent, SuccessResponse } from "@shared";
import { noop } from "lodash";
import { findOne } from "src/characters/handler";

export const findCharacter = async (userName: string) => {
  return (
    (await findOne(
      {
        httpMethod: "GET",
        pathParameters: {
          userName,
        },
      } as unknown as HttpEvent<null>,
      null,
      noop
    )) as SuccessResponse
  ).body;
};

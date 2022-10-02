import { HttpEvent, SuccessResponse } from "@shared";
import { noop } from "lodash";
import { findOne } from "src/characters/handler";

export const findCharacter = async (userName: string) => {
  const response = (await findOne(
    {
      httpMethod: "GET",
      pathParameters: {
        userName,
      },
    } as unknown as HttpEvent<null>,
    null,
    noop
  )) as SuccessResponse;

  return response.statusCode === 200 ? response.body : null;
};

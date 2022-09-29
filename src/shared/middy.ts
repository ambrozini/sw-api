import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyEvent } from "aws-lambda";

export type HttpEvent<T> = Omit<APIGatewayProxyEvent, "body"> & { body: T };

export const middify = <TEventBody, TResult>(
  handler: (event: HttpEvent<TEventBody>) => Promise<TResult>
) => middy(handler).use(httpJsonBodyParser());

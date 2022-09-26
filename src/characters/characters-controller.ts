import { Response } from "src/shared/response";
import service from "./characters-service";

const getAll = async (): Promise<Response> => {
  const characters = service.getAll();

  return {
    statusCode: 200,
    body: JSON.stringify({ characters }),
  };
};

export { getAll };

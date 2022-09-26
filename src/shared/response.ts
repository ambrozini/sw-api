export interface Response {
  statusCode: number;
  headers?: { [key: string]: string };
  body: string;
}

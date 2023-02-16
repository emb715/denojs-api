import { __DEV__ } from "../config.ts";
import { Context } from "../deps.ts";

type ResponseParams = {
  status: number;
  headers?: Headers;
  body?: any;
};

function handleResponse(
  ctx: Context,
  params: ResponseParams,
): void {
  ctx.response.status = params.status;
  ctx.response.body = params.body;
  return;
}

export { handleResponse };

import { routerHelpers, z } from "../deps.ts";
import { CustomError, ErrorStatusList, ErrorTypes } from "./handle_error.ts";
import type { RouterContext } from "../deps.ts";

async function schemaParser<T extends z.AnyZodObject>(
  schema: T,
  ctx: RouterContext<string>,
): Promise<z.infer<T>> {
  if (ctx.request.hasBody) {
    const body = ctx.request.body();
    if (body.type !== "json") {
      throw new CustomError("Invalid Body Type. Expected JSON", {
        type: ErrorTypes.HttpError,
        status: ErrorStatusList.BadRequest,
        cause: `Expected JSON, got ${body.type}`,
      });
    }
  }

  const params = ctx.params,
    query = routerHelpers.getQuery(ctx),
    body = await ctx.request.body()?.value;
  return schema.parse({
    params,
    query,
    body,
  });
}

export { schemaParser };

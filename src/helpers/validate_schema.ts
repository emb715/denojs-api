import { RouterContext, routerHelpers, z } from "../deps.ts";
import { handleError } from "./handle_error.ts";

// const validateSchema =
//   (schema: z.AnyZodObject) =>
//   async (ctx: RouterContext<string>, next: () => any): Promise<void> => {
//     try {
//       const params = ctx.params,
//         query = routerHelpers.getQuery(ctx),
//         body = await ctx.request.body()?.value;

//       const validation = schema.parse({
//         data: body,
//         where: params,
//       });
//       await next();
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         handleError(error, ctx);
//         return;
//       }
//       await next();
//     }
//   };
const validateSchema =
  (schema: z.AnyZodObject) =>
  async (ctx: RouterContext<string>, next: () => any): Promise<void> => {
    try {
      const validation = schema.parse({
        params: ctx.params,
        query: routerHelpers.getQuery(ctx),
        body: await ctx.request.body()?.value,
      });
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        handleError(error, ctx);
        return;
      }
      await next();
    }
  };

export { validateSchema };

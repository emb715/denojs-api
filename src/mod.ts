//
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Application } from "./deps.ts";
import { API_PORT, API_URL } from "./config.ts";
import { ApiRouter } from "./router.ts";

import type { RouterContext } from "./deps.ts";

// Import API modules
import "./things/things.ts";

ApiRouter.get<string>(`${API_URL}`, (ctx: RouterContext<string>) => {
  ctx.response.body = {
    status: "success",
    message: "Alive :)",
  };
});

const app = new Application();
app.use(oakCors());
app.use(ApiRouter.routes());
app.use(ApiRouter.allowedMethods());

console.log(`Server running on port ${API_PORT}`);
await app.listen({ port: Number(API_PORT) });

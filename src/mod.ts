//
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Application, isHttpError, Sentry, Status } from "./deps.ts";
import { API_PORT, API_URL } from "./config.ts";
import { Router } from "./deps.ts";
import type { RouterContext } from "./deps.ts";
import { errorLogger } from "./helpers/error_logger.ts";
import { handleError, ServerError } from "./helpers/handle_error.ts";
import { handleResponse } from "./helpers/handle_response.ts";
// Import Endpoint Routes
import { ThingsRouter } from "./endpoints/things/things_router.ts";

const app = new Application();
const ApiRouter = new Router();

ApiRouter.get<string>(`/`, (ctx: RouterContext<string>) => {
  ctx.response.body = "Alive :)";
});
ApiRouter.get<string>(`${API_URL}`, (ctx: RouterContext<string>) => {
  ctx.response.body = {
    status: "success",
    message: "Alive :)",
  };
});

// TODO: ADD AUTH MIDDLEWARE
// app.use();

// CORS
app.use(oakCors());

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Routes
app.use(ApiRouter.routes());
// Add routers from modules
app.use(ThingsRouter.routes());

// Add allowed methods
app.use(ApiRouter.allowedMethods());

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
  errorLogger.captureException(evt.error);
});

console.log(`Server running on port ${API_PORT}`);
await app.listen({ port: Number(API_PORT) });

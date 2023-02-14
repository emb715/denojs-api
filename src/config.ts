const __DEV__ = Deno.env.get("NODE_ENV") !== "production" ?? false as boolean;

const API_PORT = Deno.env.get("API_PORT") ?? 8080 as number;

const API_VERSION = "v1" as const;
const API_URL = `/api/${API_VERSION}` as const;

export { __DEV__, API_PORT, API_URL, API_VERSION };

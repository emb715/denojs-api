import "https://deno.land/std@0.177.0/dotenv/load.ts";

const __DEV__ = Deno.env.get("NODE_ENV") !== "production" ?? false as boolean;

const DATABASE_URL = Deno.env.get("DATABASE_URL") ?? "" as string;

const MONGO_DB_CONNECT = Deno.env.get("MONGO_DB_CONNECT") ?? "" as string;
const MONGO_DB_URL = Deno.env.get("MONGO_DB_URL") ?? "" as string;
const MONGO_DB_NAME = Deno.env.get("MONGO_DB_NAME") ?? "" as string;
const MONGO_DB_USER = Deno.env.get("MONGO_DB_USER") ?? "" as string;
const MONGO_DB_PASS = Deno.env.get("MONGO_DB_PASS") ?? "" as string;

const API_PORT = Deno.env.get("API_PORT") ?? 8080 as number;

const API_VERSION = "v1" as const;
const API_URL = `/api/${API_VERSION}` as const;

export {
  __DEV__,
  API_PORT,
  API_URL,
  API_VERSION,
  DATABASE_URL,
  MONGO_DB_CONNECT,
  MONGO_DB_NAME,
  MONGO_DB_PASS,
  MONGO_DB_URL,
  MONGO_DB_USER,
};

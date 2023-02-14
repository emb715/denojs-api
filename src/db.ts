import { Database, MongoDBConnector, SQLite3Connector } from "./deps.ts";
import {
  MONGO_DB_NAME,
  MONGO_DB_PASS,
  MONGO_DB_URL,
  MONGO_DB_USER,
} from "./config.ts";

/**
 * For using a different database, change the connector
 * and the database will be connected automatically.
 * Oficial Docs of DENO DB:
 * https://eveningkid.com/denodb-docs/docs/guides/connect-database
 */

// Example of using a different database
// SQL LITE
// const connector = new SQLite3Connector({
//   filepath: './database.sqlite',
// });
// MONGO DB
// const connector = new MongoDBConnector({
//   // uri: "mongodb://127.0.0.1:27017",
//   database: "test",
// });

function connectWithMongo() {
  if (!MONGO_DB_NAME) {
    throw new Error("MONGO_DB_NAME is not defined");
  }
  if (!MONGO_DB_USER) {
    throw new Error("MONGO_DB_USER is not defined");
  }
  if (!MONGO_DB_PASS) {
    throw new Error("MONGO_DB_PASS is not defined");
  }
  const DB_PORT = 27017;
  const serverList = MONGO_DB_URL.split(",");

  return new MongoDBConnector({
    db: MONGO_DB_NAME,
    tls: true,
    servers: [
      ...serverList.map((server) => ({ host: server, port: DB_PORT })),
    ],
    credential: {
      username: MONGO_DB_USER,
      password: MONGO_DB_PASS,
      db: MONGO_DB_NAME,
      mechanism: "SCRAM-SHA-1",
    },
    database: MONGO_DB_NAME,
  });
}

const connect = () => {
  try {
    const connector = connectWithMongo();
    return new Database(connector);
  } catch (error) {
    console.error("DB Error", error);
  }
};

const DB = connect() as Database;

export { DB };

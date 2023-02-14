import { Database, SQLite3Connector } from './deps.ts';

const connector = new SQLite3Connector({
  filepath: './database.sqlite',
});

const DB = new Database(connector);

export {DB}
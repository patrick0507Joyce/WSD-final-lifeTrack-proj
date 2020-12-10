import { Client } from "../deps.js";

let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    const CONCURRENT_CONNECTIONS = 4;
    const DATABASE_URL = Deno.env.toObject().DATABASE_URL;
    config.database = new Client(DATABASE_URL);
  }

export { config }; 


import { Pool } from "../deps.js";

let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    const CONCURRENT_CONNECTIONS = 1;
    console.log("db url is: ", Deno.env.toObject().DATABASE_URL);
    config.database = new Pool(
      Deno.env.toObject().DATABASE_URL,
      CONCURRENT_CONNECTIONS
    );
  }

export { config }; 


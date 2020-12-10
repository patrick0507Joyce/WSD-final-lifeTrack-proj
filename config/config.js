import { Pool } from "../deps.js";

let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    const CONCURRENT_CONNECTIONS = 2;
    config.database = new Pool(
      {
        hostname: "hattie.db.elephantsql.com",
        database: "ejkihkqn",
        user: "ejkihkqn",
        password: "VQERJAuPVbPQj-xNK52wVKriXU8GixbE",
        port: 5432,
      },
      CONCURRENT_CONNECTIONS
    );
  }

export { config }; 


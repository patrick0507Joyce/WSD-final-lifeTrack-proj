let config = {};

if (Deno.env.toObject().DATABASE_URL) {
  const DATABASE_URL = Deno.env.toObject().DATABASE_URL;
  config.database = DATABASE_URL;
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "ejkihkqn",
    user: "ejkihkqn",
    password: "VQERJAuPVbPQj-xNK52wVKriXU8GixbE",
    port: 5432,
  };
} else if (Deno.env.get("TEST_ENVIRONMENT")) {
  config.database = {};
} else {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "ejkihkqn",
    user: "ejkihkqn",
    password: "VQERJAuPVbPQj-xNK52wVKriXU8GixbE",
    port: 5432,
  };
}
/*


import { Pool } from "../deps.js";

let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    const CONCURRENT_CONNECTIONS = 1;
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
*/
export { config };

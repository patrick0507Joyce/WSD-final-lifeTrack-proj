let config = {};
/*
if (Deno.env.toObject().DATABASE_URL) {
  const DATABASE_URL = Deno.env.toObject().DATABASE_URL;
  config.database = DATABASE_URL;
} else if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    config.database = {
        //TODO: fill the config with your own db info
        hostname: "hattie.db.elephantsql.com",
        database: "ejkihkqn",
        user: "ejkihkqn",
        password: "VQERJAuPVbPQj-xNK52wVKriXU8GixbE",
        port: 5432,
      };
  }
*/

config.database = {
  //TODO: fill the config with your own db info
  hostname: "hattie.db.elephantsql.com",
  database: "ejkihkqn",
  user: "ejkihkqn",
  password: "VQERJAuPVbPQj-xNK52wVKriXU8GixbE",
  port: 5432,
};

export { config }; 


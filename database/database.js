import { config } from "../config/config.js";
import { Client } from "../deps.js";

const getClient = () => {
  return new Client(config.database);
};
/*
const executeQuery = async (query, ...params) => {
  const client = await getClient();
  try {
    return await client.query(query, ...params);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  return null;
};
*/

const executeQuery = async(query, ...args) => {
  const client = getClient();
  try {
      await client.connect();
      return await client.query(query, ...args);
  } catch (e) {
      console.log(e);
  } finally {
      await client.end();
  }
}

export { executeQuery };

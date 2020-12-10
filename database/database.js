import { config } from "../config/config.js";

const getClient = async () => {
  return await config.database.connect();
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

import { config } from "../config/config.js";
import { Pool } from "../deps.js";


const CONCURRENT_CONNECTIONS = 2;
const pool = new Pool(config.database, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...params) => {
  const client = await pool.connect();
  try {
    await client.connect();
    return await client.query(query, ...params);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  return null;
};

export { executeQuery };

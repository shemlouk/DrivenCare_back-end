import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error("No database url environment variable");

const config = {
  connectionString: databaseUrl,
};

export default new Pool(config);

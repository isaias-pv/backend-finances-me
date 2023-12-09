import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER,
	port: process.env.DB_PORT,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export { connection };
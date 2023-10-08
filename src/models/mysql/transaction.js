import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
	host: "localhost",
	user: "root",
	port: 3306,
	password: "2133002Isaias_",
	database: "finance_db",
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class TransactionModel {
	static async getAll() {
		const [transactions] = await connection.query(
			"SELECT * FROM transactions;"
		);

		return transactions;
	}
}

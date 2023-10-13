import { connection } from "./query.js";

export class TypeTransactionModel {
	static async getAll() {
		const [types_transactions] = await connection.query(
			`SELECT * FROM types_transactions;`
		);

		return types_transactions;
	}

	static async findById(id) {
		const [types_transactions] = await connection.query(
			`SELECT * FROM types_transactions WHERE type_transaction_id = ?;`,
			[id]
		);

		return types_transactions;
	}

	static async searchByName(name) {
		const [types_transactions] = await connection.query(
			`SELECT * FROM types_transactions WHERE name LIKE ('%?%');`,
			[name]
		);

		return types_transactions;
	}
}

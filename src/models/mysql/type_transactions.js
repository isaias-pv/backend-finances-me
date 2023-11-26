import { connection } from "./query.js";

export class TypeTransactionModel {
	static async getAll() {
		const { rows } = await connection.query(
			`SELECT * FROM types_transactions;`
		);

		return rows;
	}

	static async findById(id) {
		const { rows } = await connection.query(
			`SELECT * FROM types_transactions WHERE type_transaction_id = $1;`,
			[id]
		);

		return rows;
	}

	static async searchByName(name) {
		const { rows } = await connection.query(
			`SELECT * FROM types_transactions WHERE name LIKE ('%$1%');`,
			[name]
		);

		return rows;
	}
}

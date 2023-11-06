import { connection } from "./query.js";

export class ConceptModel {
	static async getOnlyVisible() {
		const [concepts] = await connection.query(`SELECT * FROM concepts WHERE is_visible = 1;`);

		return concepts;
	}

	static async getAll() {
		const [concepts] = await connection.query(`SELECT * FROM concepts;`);

		return concepts;
	}

	static async findById(id) {
		const [concepts] = await connection.query(
			`SELECT * FROM concepts WHERE concept_id = ?;`,
			[id]
		);

		return concepts;
	}

	static async searchByName(name) {
		const [concepts] = await connection.query(
			`SELECT * FROM concepts WHERE name LIKE ('%?%');`,
			[name]
		);

		return concepts;
	}

	static async findByTypeTransactionId(id) {
		const [concepts] = await connection.query(
			`SELECT * FROM concepts WHERE type_transaction_id = ? AND is_visible = 1;`,
			[id]
		);

		return concepts;
	}
}

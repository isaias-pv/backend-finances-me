import { connection } from "./query.js";

export class ConceptModel {
	static async getOnlyVisible() {
		const { rows } = await connection.query(
			`SELECT * FROM concepts WHERE is_visible = 1;`
		);

		return rows;
	}

	static async getAll() {
		const { rows } = await connection.query(`SELECT * FROM concepts;`);

		return rows;
	}

	static async findById(id) {
		const { rows } = await connection.query(
			`SELECT * FROM concepts WHERE concept_id = $1;`,
			[id]
		);

		return rows;
	}

	static async searchByName(name) {
		const { rows } = await connection.query(
			`SELECT * FROM concepts WHERE name LIKE ('%$1%');`,
			[name]
		);

		return rows;
	}

	static async findByTypeTransactionId(id) {
		const { rows } = await connection.query(
			`SELECT * FROM concepts WHERE type_transaction_id = $1 AND is_visible = 1;`,
			[id]
		);

		return rows;
	}
}

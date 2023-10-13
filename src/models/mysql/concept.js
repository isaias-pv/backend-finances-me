import { connection } from "./query.js";

export class ConceptModel {
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
}

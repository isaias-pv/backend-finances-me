import { connection } from "./query.js";

export class BankModel {
	static async getAll() {
		const { rows } = await connection.query(`SELECT * FROM banks;`);

		return rows;
	}

	static async getAllQuantityAccounts() {
		const { rows } = await connection.query(
			`SELECT b.*, COUNT(*) as accounts_quantity FROM banks b INNER JOIN accounts a ON a.bank_id = b.bank_id GROUP BY a.bank_id;`
		);

		return rows;
	}

	static async findById(id) {
		const { rows } = await connection.query(
			`SELECT * FROM banks WHERE bank_id = $1;`,
			[id]
		);

		return rows;
	}

	static async searchByName(name) {
		const { rows } = await connection.query(
			`SELECT * FROM banks WHERE name LIKE ('%$1%');`,
			[name]
		);

		return rows;
	}

	static async create({ name }) {
		const { rows } = await connection.query(
			`INSERT INTO banks (name) VALUES ($1);`,
			[name]
		);

		return rows;
	}

	static async update(id, { name }) {
		const { rows } = await connection.query(
			`UPDATE banks SET 
				name = $1
			WHERE bank_id = $2;`,
			[name, id]
		);

		return rows;
	}

	static async delete(id) {
		const { rows } = await connection.query(
			`DELETE FROM banks WHERE bank_id = $1;`,
			[id]
		);

		return rows;
	}
}

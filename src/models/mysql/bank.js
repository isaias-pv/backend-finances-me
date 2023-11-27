import { connection } from "./query.js";

export class BankModel {
	static async getAll() {
		const [banks] = await connection.query(`SELECT * FROM banks;`);

		return banks;
	}

	static async getAllQuantityAccounts() {
		const [banks] = await connection.query(`SELECT b.*, COUNT(*) as accounts_quantity FROM banks b INNER JOIN accounts a ON a.bank_id = b.bank_id GROUP BY a.bank_id;`);

		return banks;
	}

	static async findById(id) {
		const [banks] = await connection.query(
			`SELECT * FROM banks WHERE bank_id = ?;`,
			[id]
		);

		return banks;
	}

	static async searchByName(name) {
		const [banks] = await connection.query(
			`SELECT * FROM banks WHERE name LIKE ('%?%');`,
			[name]
		);

		return banks;
	}

	static async create({ name }) {
		const [bank] = await connection.query(
			`INSERT INTO banks (name) VALUES (?);`,
			[name]
		);

		return bank;
	}

	static async update(id, { name }) {
		const [bank] = await connection.query(
			`UPDATE banks SET 
				name = ?
			WHERE bank_id = ?;`,
			[name, id]
		);

		return bank;
	}

	static async delete(id) {
		const [bank] = await connection.query(`DELETE FROM banks WHERE bank_id = ?;`, [
			id,
		]);

		return bank;
	}
}

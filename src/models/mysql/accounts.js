import { connection } from "./query.js";

export class AccountModel {
	static async getAll() {
		const { rows } = await connection.query(
			`SELECT a.*, b.name as name_bank FROM accounts a INNER JOIN banks b ON a.bank_id = b.bank_id ORDER by a.created_at;`
		);

		return rows;
	}

	static async findById(id) {
		const { rows } = await connection.query(
			`SELECT * FROM accounts WHERE account_id = $1;`,
			[id]
		);

		return rows;
	}

	static async searchByName(name) {
		const { rows } = await connection.query(
			`SELECT * FROM accounts WHERE name LIKE ('%$1%');`,
			[name]
		);

		return rows;
	}

	static async findByBankId(bank_id) {
		const { rows } = await connection.query(
			`SELECT * FROM accounts WHERE bank_id $1;`,
			[bank_id]
		);

		return rows;
	}

	static async create({ name, balance, bank_id }) {
		const { rows } = await connection.query(
			`INSERT INTO accounts (name, balance, bank_id) VALUES ($1, $2, $3);`,
			[name, balance, bank_id]
		);

		return rows;
	}

	static async update(id, { name, balance, bank_id }) {
		const { rows } = await connection.query(
			`UPDATE accounts SET 
				name = $1,
				balance = $2,
				bank_id = $3
			WHERE account_id = $4;`,
			[name, balance, bank_id, id]
		);

		return rows;
	}

	static async delete(id) {
		const { rows } = await connection.query(
			`DELETE FROM accounts WHERE account_id = $1;`,
			[id]
		);

		return rows;
	}
}

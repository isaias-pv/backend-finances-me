import { connection } from "./query.js";

export class AccountModel {
	static async getAll() {
		const [accounts] = await connection.query(`SELECT * FROM accounts;`);

		return accounts;
	}

	static async findById(id) {
		const [accounts] = await connection.query(
			`SELECT * FROM accounts WHERE account_id = ?;`,
			[id]
		);

		return accounts;
	}

	static async searchByName(name) {
		const [accounts] = await connection.query(
			`SELECT * FROM accounts WHERE name LIKE ('%?%');`,
			[name]
		);

		return accounts;
	}

	static async findByBankId(bank_id) {
		const [accounts] = await connection.query(
			`SELECT * FROM accounts WHERE bank_id ?;`,
			[bank_id]
		);

		return accounts;
	}

	static async create({ name, balance, bank_id }) {
		const [account] = await connection.query(
			`INSERT INTO accounts (name, balance, bank_id) VALUES (?, ?, ?);`,
			[name, balance, bank_id]
		);

		return account;
	}

	static async update(id, { name, balance, bank_id }) {
		const [account] = await connection.query(
			`UPDATE accounts SET 
				name = ?,
				balance = ?,
				bank_id = ?
			WHERE account_id = ?;`,
			[name, balance, bank_id, id]
		);

		return account;
	}

	static async delete(id) {
		const [account] = await connection.query(
			`DELETE FROM accounts WHERE ?;`,
			[id]
		);

		return account;
	}
}

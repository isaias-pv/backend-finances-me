import { connection } from "./query.js";

export class AccountModel {
	static async getAll() {
		const [accounts] = await connection.query(`
		SELECT a.account_id,
		a.name,
		b.bank_id,
		b.name as bank_name,
		a.balance,
		SUM(
			CASE
				WHEN tt.name = 'INCOME' THEN t.amount
				ELSE 0
			END
		) AS income,
		SUM(
			CASE
				WHEN tt.name = 'EGRESS' THEN t.amount
				ELSE 0
			END
		) AS egress,
		SUM(
			CASE
				WHEN tt.name = 'INCOME' THEN t.amount
				ELSE 0
			END
		) - SUM(
			CASE
				WHEN tt.name = 'EGRESS' THEN t.amount
				ELSE 0
			END
		) AS difference,
		a.created_at,
		a.creator_user_id
	FROM transactions t
		LEFT JOIN concepts c ON c.concept_id = t.concept_id
		JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id
		RIGHT JOIN accounts a ON a.account_id = t.account_origin_id
		OR a.account_id = t.account_destination_id
		INNER JOIN banks b ON a.bank_id = b.bank_id
	GROUP BY a.account_id
	ORDER by a.created_at;`);

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
			`DELETE FROM accounts WHERE account_id = ?;`,
			[id]
		);

		return account;
	}
}

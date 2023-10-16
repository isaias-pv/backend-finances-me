import { connection } from "./query.js";
import { convertDateToSaveDB } from "./../../utils/date.js";

export class TransactionModel {
	static async getAll() {
		const [transactions] = await connection.query(
			`SELECT t.*, 
					tt.name as type_transaction_name,
					ad.name as account_destination,
					ao.name as account_origin,
					c.name as concept
			FROM transactions t 
					LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
					LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
					LEFT JOIN concepts c ON c.concept_id = t.concept_id
					INNER JOIN types_transactions tt on tt.type_transaction_id = t.type_transaction_id
	 `
		);

		return transactions;
	}

	static async getTransationById(id) {
		const [transactions] = await connection.query(
			`SELECT t.*, 
						tt.name as type_transaction_name,
						ad.name as account_destination,
						ao.name as account_origin,
						c.name as concept
				FROM transactions t 
						LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
						LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
						LEFT JOIN concepts c ON c.concept_id = t.concept_id
						INNER JOIN types_transactions tt on tt.type_transaction_id = t.type_transaction_id
				WHERE t.transaction_id = ?`,
			[id]
		);

		return transactions;
	}

	static async getIncomeAndExpenseByAccounts() {
		const [transactions] = await connection.query(
			`SELECT 
					COALESCE(t.account_origin_id, t.account_destination_id) AS account_id,
					a.name AS account_name,
					(SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type_transaction_id = 1 AND account_destination_id = MAX(a.account_id)) AS incomes,
					(SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type_transaction_id = 2 AND account_origin_id = MAX(a.account_id)) AS expenses
			FROM transactions t
				JOIN accounts a ON COALESCE(t.account_origin_id, t.account_destination_id) = a.account_id
				GROUP BY COALESCE(t.account_origin_id, t.account_destination_id), a.name;`
		);

		return transactions;
	}

	static async getRevenuesAndExpendituresGeneral() {
		const [transactions] = await connection.query(
			`-- Total general
			SELECT
				NULL AS name,
				SUM(amount) AS total
			FROM transactions
			
			UNION
			
			-- Totales por tipo de transacción
			SELECT
				tt.name as name,
				SUM(t.amount) AS total
			FROM transactions t
			JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = t.type_transaction_id
			WHERE 
			GROUP BY COALESCE(t.type_transaction_id), tt.name;
			
			`
		);

		return transactions;
	}

	static async getAvailable() {
		const [[transactions]] = await connection.query(
			`SELECT SUM(balance) AS available FROM accounts;`
		);

		return transactions;
	}

	static async getBalanceByBank() {
		const [transactions] = await connection.query(
			`SELECT b.name AS bank, SUM(a.balance) AS balance
				FROM banks b
				JOIN accounts a ON b.bank_id = a.bank_id
				GROUP BY b.name;`
		);

		return transactions;
	}

	static async getBalanceByAccount() {
		const [transactions] = await connection.query(
			`SELECT a.name AS account, a.balance AS balance FROM accounts a;`
		);

		return transactions;
	}

	static async getIncomeExpenseByTransaction() {
		const [transactions] = await connection.query(
			`SELECT tt.name AS type_transaction, COUNT(t.transaction_id) AS total_transactions, SUM(t.amount) AS total_amount
				FROM transactions t
				JOIN types_transactions tt ON t.type_transaction_id = tt.type_transaction_id
				GROUP BY tt.name;`
		);

		return transactions;
	}

	static async create({
		type_transaction_id,
		date_transaction,
		amount,
		concept_id,
		observation,
		account_origin_id,
		account_destination_id,
	}) {
		date_transaction = convertDateToSaveDB(date_transaction);

		const [transaction] = await connection.query(
			`INSERT INTO transactions (type_transaction_id, date_transaction, amount, concept_id, observation, account_origin_id, account_destination_id) VALUES (?, ?, ?, ?, ?, ?, ?);`,
			[
				type_transaction_id,
				date_transaction,
				amount,
				concept_id,
				observation,
				account_origin_id,
				account_destination_id,
			]
		);

		return transaction;
	}
}

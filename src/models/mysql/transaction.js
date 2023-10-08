import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
	host: "localhost",
	user: "root",
	port: 3306,
	password: "2133002Isaias_",
	database: "finance_db",
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class TransactionModel {
	static async getAll() {
		const [transactions] = await connection.query(
			"SELECT * FROM transactions;"
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

}

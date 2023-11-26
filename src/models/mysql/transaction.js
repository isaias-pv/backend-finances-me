import { connection } from "./query.js";
import { convertDateToSaveDB } from "./../../utils/date.js";

export class TransactionModel {
	static async getAll() {
		const { rows } = await connection.query(
			`SELECT 
				t.*,
				tt.name AS type_transaction_name,
				ad.name AS account_destination,
				ao.name AS account_origin,
				c.name AS concept
			FROM transactions t 
				LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
				LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
				LEFT JOIN concepts c ON c.concept_id = t.concept_id
				INNER JOIN types_transactions tt ON tt.type_transaction_id = c.type_transaction_id
			ORDER BY t.date_transaction DESC;`
		);

		return rows;
	}

	static async getAllOrder() {
		const { rows } = await connection.query(
			`-- Obtener información con filtro
			SELECT 
				tt.name AS type_transaction_name,
				t.date_transaction,
				JSON_ARRAYAGG(
					JSON_OBJECT(
						'transaction_id', t.transaction_id,
						'code_transaction', t.code_transaction,
						'amount', t.amount,
						'observation', t.observation,
						'type_transaction_name', tt.name,
						'account_destination', ad.name,
						'account_origin', ao.name,
						'date_transaction', t.date_transaction,
						'concept', c.name
					)
				) AS transactions
			FROM transactions t 
			LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
			LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
			LEFT JOIN concepts c ON c.concept_id = t.concept_id
			INNER JOIN types_transactions tt ON tt.type_transaction_id = c.type_transaction_id
			GROUP BY tt.name, t.date_transaction
			
			UNION ALL
			
			-- Obtener todas las transacciones sin filtro
			SELECT 
				'ALL' AS type_transaction_name,
				NULL AS date_transaction,
				JSON_ARRAYAGG(
					JSON_OBJECT(
						'transaction_id', t.transaction_id,
						'code_transaction', t.code_transaction,
						'amount', t.amount,
						'observation', t.observation,
						'type_transaction_name', tt.name,
						'account_destination', ad.name,
						'account_origin', ao.name,
						'date_transaction', t.date_transaction,
						'concept', c.name
					)
				) AS transactions
			FROM transactions t 
			LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
			LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
			LEFT JOIN concepts c ON c.concept_id = t.concept_id
			INNER JOIN types_transactions tt ON tt.type_transaction_id = c.type_transaction_id;`
		);

		return rows;
	}

	static async getAllOrderFilter(key = "DATE", value = new Date()) {
		let query = `
        SELECT 
            tt.name AS type_transaction_name,
            t.date_transaction,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'transaction_id', t.transaction_id,
                    'code_transaction', t.code_transaction,
                    'amount', t.amount,
                    'observation', t.observation,
                    'type_transaction_name', tt.name,
                    'account_destination', ad.name,
                    'account_origin', ao.name,
                    'date_transaction', t.date_transaction,
                    'concept', c.name
                )
            ) AS transactions
        FROM transactions t 
        LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
        LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
        LEFT JOIN concepts c ON c.concept_id = t.concept_id
        INNER JOIN types_transactions tt ON tt.type_transaction_id = c.type_transaction_id`;

		const queryParams = [];

		if (key === "MONTH") {
			query += ` WHERE MONTH(t.date_transaction) = MONTH(?) AND YEAR(t.date_transaction) = YEAR(?)`;
			queryParams.push(value, value);
		} else if (key === "YEAR") {
			query += ` WHERE YEAR(t.date_transaction) = YEAR(?)`;
			queryParams.push(value);
		} else if (key === "DATE") {
			query += ` WHERE DATE(t.date_transaction) = DATE(?)`;
			queryParams.push(value);
		} else if (key === "RANGE") {
			const { date_start, date_end } = JSON.parse(value);

			query += ` WHERE DATE(t.date_transaction) BETWEEN DATE(?) AND DATE(?)`;
			queryParams.push(date_start);
			queryParams.push(date_end);
		} else if (key === "SEARCH") {
			query += ` WHERE t.observation LIKE ? OR c.name LIKE ?`;
			queryParams.push(`%${value}%`);
			queryParams.push(`%${value}%`);
		}

		query += ` GROUP BY tt.name, t.date_transaction
				
				UNION ALL
				
				-- Obtener todas las transacciones sin filtro
				SELECT 
					'ALL' AS type_transaction_name,
					NULL AS date_transaction,
					JSON_ARRAYAGG(
						JSON_OBJECT(
							'transaction_id', t.transaction_id,
							'code_transaction', t.code_transaction,
							'amount', t.amount,
							'observation', t.observation,
							'type_transaction_name', tt.name,
							'account_destination', ad.name,
							'account_origin', ao.name,
							'date_transaction', t.date_transaction,
							'concept', c.name
						)
					) AS transactions
				FROM transactions t 
				LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
				LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
				LEFT JOIN concepts c ON c.concept_id = t.concept_id
				INNER JOIN types_transactions tt ON tt.type_transaction_id = c.type_transaction_id;`;
		console.log(query);

		const { rows } = await connection.query(query, queryParams);
		return rows;
	}

	static async getRecents() {
		const { rows } = await connection.query(
			`SELECT 
				t.*,
				tt.name AS type_transaction_name,
				ad.name AS account_destination,
				ao.name AS account_origin,
				c.name AS concept
			FROM transactions t 
				LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
				LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
				LEFT JOIN concepts c ON c.concept_id = t.concept_id
				INNER JOIN types_transactions tt ON tt.type_transaction_id = c.type_transaction_id
			ORDER BY t.date_transaction DESC
			LIMIT 6;
	 `
		);

		return rows;
	}

	static async getTransationById(id) {
		const { rows } = await connection.query(
			`SELECT t.*, 
						tt.name as type_transaction_name,
						ad.name as account_destination,
						ao.name as account_origin,
						c.name as concept
				FROM transactions t 
						LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
						LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
						LEFT JOIN concepts c ON c.concept_id = t.concept_id
						INNER JOIN types_transactions tt on tt.type_transaction_id = c.type_transaction_id
				WHERE t.transaction_id = $1`,
			[id]
		);

		return rows;
	}

	static async getTransationByCode(code) {
		const { rows } = await connection.query(
			`SELECT t.*, 
						tt.name as type_transaction_name,
						ad.name as account_destination,
						ao.name as account_origin,
						c.name as concept
				FROM transactions t 
						LEFT JOIN accounts ao ON ao.account_id = t.account_origin_id
						LEFT JOIN accounts ad ON ad.account_id = t.account_destination_id
						LEFT JOIN concepts c ON c.concept_id = t.concept_id
						INNER JOIN types_transactions tt on tt.type_transaction_id = c.type_transaction_id
				WHERE t.code_transaction = $1`,
			[code]
		);

		return rows;
	}

	static async getIncomeAndExpenseByAccounts() {
		const { rows } = await connection.query(
			`SELECT 
					COALESCE(t.account_origin_id, t.account_destination_id) AS account_id,
					a.name AS account_name,
					(SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE concept_id = 1 AND account_destination_id = MAX(a.account_id)) AS incomes,
					(SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE concept_id = 2 AND account_origin_id = MAX(a.account_id)) AS expenses
			FROM transactions t
				JOIN accounts a ON COALESCE(t.account_origin_id, t.account_destination_id) = a.account_id
				GROUP BY COALESCE(t.account_origin_id, t.account_destination_id), a.name;`
		);

		return rows;
	}

	static async getRevenuesAndExpendituresGeneral() {
		const { rows } = await connection.query(
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
			LEFT JOIN concepts c ON c.concept_id = t.concept_id
			JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id 
			GROUP BY COALESCE(c.type_transaction_id), tt.name;
			`
		);

		return rows;
	}

	static async getAvailable() {
		const {
			rows: [transactions],
		} = await connection.query(
			`SELECT SUM(balance) AS available FROM accounts;`
		);

		return transactions;
	}

	static async getBalanceByBank() {
		const { rows } = await connection.query(
			`SELECT b.name AS bank, SUM(a.balance) AS balance
				FROM banks b
				JOIN accounts a ON b.bank_id = a.bank_id
				GROUP BY b.name;`
		);

		return rows;
	}

	static async getBalanceByAccount() {
		const { rows } = await connection.query(
			`SELECT a.name AS account, a.balance AS balance FROM accounts a;`
		);

		return rows;
	}

	static async getIncomeExpenseByTransaction() {
		const { rows } = await connection.query(
			`SELECT tt.name AS type_transaction, COUNT(t.transaction_id) AS total_transactions, SUM(t.amount) AS total_amount
				FROM transactions t
				LEFT JOIN concepts c ON c.concept_id = t.concept_id
				JOIN types_transactions tt ON c.type_transaction_id = tt.type_transaction_id
				GROUP BY tt.name;`
		);

		return rows;
	}

	static async create({
		date_transaction,
		amount,
		concept_id,
		observation,
		account_origin_id,
		account_destination_id,
		transation_code_id,
		code_transaction,
	}) {
		date_transaction = convertDateToSaveDB(date_transaction);

		const { rows } = await connection.query(
			`INSERT INTO transactions (code_transaction, date_transaction, amount, concept_id, observation, account_origin_id, account_destination_id) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
			[
				code_transaction,
				date_transaction,
				amount,
				concept_id,
				observation,
				account_origin_id,
				account_destination_id,
				transation_code_id,
			]
		);

		return rows;
	}
}

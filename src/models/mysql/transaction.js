import { connection } from "./query.js";
import { convertDateToSaveDB } from "./../../utils/date.js";

export class TransactionModel {
	static async getAll() {
		const [transactions] = await connection.query(
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

		return transactions;
	}

	static async getAllOrder() {
		const [transactions] = await connection.query(
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

		return transactions;
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
				INNER JOIN types_transactions tt ON tt.type_transaction_id = c.type_transaction_id`;

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

		const [transactions] = await connection.query(query, queryParams);
		return transactions;
	}

	static async getRecents() {
		const [transactions] = await connection.query(
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
						INNER JOIN types_transactions tt on tt.type_transaction_id = c.type_transaction_id
				WHERE t.transaction_id = ?`,
			[id]
		);

		return transactions;
	}

	static async getTransationByCode(code) {
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
						INNER JOIN types_transactions tt on tt.type_transaction_id = c.type_transaction_id
				WHERE t.code_transaction = ?`,
			[code]
		);

		return transactions;
	}

	static async getIncomeAndExpenseByAccounts() {
		const [transactions] = await connection.query(
			`SELECT 
					COALESCE(t.account_origin_id, t.account_destination_id) AS account_id,
					a.name AS account_name,
					(SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE concept_id = 1 AND account_destination_id = MAX(a.account_id)) AS incomes,
					(SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE concept_id = 2 AND account_origin_id = MAX(a.account_id)) AS expenses
			FROM transactions t
				JOIN accounts a ON COALESCE(t.account_origin_id, t.account_destination_id) = a.account_id
				GROUP BY COALESCE(t.account_origin_id, t.account_destination_id), a.name;`
		);

		return transactions;
	}

	static async getRevenuesAndExpendituresGeneral() {
		const [transactions] = await connection.query(
			`-- Total general
			SELECT 'TOTAL' AS name,
				SUM(amount) AS total
			FROM transactions
			WHERE MONTH(date_transaction) = MONTH(NOW())
				AND YEAR(date_transaction) = YEAR(NOW())
			UNION
			-- Totales por tipo de transacción
			SELECT tt.name as name,
				SUM(t.amount) AS total
			FROM transactions t
				LEFT JOIN concepts c ON c.concept_id = t.concept_id
				JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id
			WHERE MONTH(t.date_transaction) = MONTH(NOW())
				AND YEAR(t.date_transaction) = YEAR(NOW())
			GROUP BY COALESCE(c.type_transaction_id),
				tt.name;
			
				-- SELECT (
				--     SELECT COALESCE(SUM(t.amount), 0)
				--     FROM transactions t
				--         JOIN concepts c ON c.concept_id = t.concept_id
				--         JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id
				--     WHERE tt.name = 'INCOME' AND MONTH(t.date_transaction) = MONTH(NOW()) AND YEAR(t.date_transaction) = YEAR(NOW())
				-- ) AS total_income,
				-- (
				--     SELECT COALESCE(SUM(t.amount), 0)
				--     FROM transactions t
				--         JOIN concepts c ON c.concept_id = t.concept_id
				--         JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id
				--     WHERE tt.name = 'EGRESS' AND MONTH(t.date_transaction) = MONTH(NOW()) AND YEAR(t.date_transaction) = YEAR(NOW())
				-- ) AS total_egress,
				-- (
				--     SELECT COALESCE(
				--             SUM(
				--                 CASE
				--                     WHEN tt.name = 'INCOME' THEN t.amount
				--                     ELSE 0
				--                 END
				--             ),
				--             0
				--         ) - COALESCE(
				--             SUM(
				--                 CASE
				--                     WHEN tt.name = 'EGRESS' THEN t.amount
				--                     ELSE 0
				--                 END
				--             ),
				--             0
				--         )
				--     FROM transactions t
				--         JOIN concepts c ON c.concept_id = t.concept_id
				--         JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id
				--         WHERE MONTH(t.date_transaction) = MONTH(NOW()) AND YEAR(t.date_transaction) = YEAR(NOW())
				-- ) AS difference;
			
				-- SELECT 
				-- (SELECT COALESCE(SUM(t.amount), 0) FROM transactions t
				--     JOIN concepts c ON c.concept_id = t.concept_id
				--     JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id 
				--     WHERE tt.name = 'INCOME') AS total_income,
				-- (SELECT COALESCE(SUM(t.amount), 0) FROM transactions t
				--     JOIN concepts c ON c.concept_id = t.concept_id
				--     JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id 
				--     WHERE tt.name = 'EGRESS') AS total_egress,
				-- (SELECT COALESCE(SUM(CASE WHEN tt.name = 'INCOME' THEN t.amount ELSE 0 END), 0) - 
				--  COALESCE(SUM(CASE WHEN tt.name = 'EGRESS' THEN t.amount ELSE 0 END), 0)
				-- FROM transactions t
				-- JOIN concepts c ON c.concept_id = t.concept_id
				-- JOIN types_transactions tt ON COALESCE(tt.type_transaction_id, tt.name) = c.type_transaction_id) AS difference;			
			
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
				LEFT JOIN concepts c ON c.concept_id = t.concept_id
				JOIN types_transactions tt ON c.type_transaction_id = tt.type_transaction_id
				GROUP BY tt.name;`
		);

		return transactions;
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

		const [transaction] = await connection.query(
			`INSERT INTO transactions (code_transaction, date_transaction, amount, concept_id, observation, account_origin_id, account_destination_id) VALUES (?, ?, ?, ?, ?, ?, ?);`,
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

		return transaction;
	}
}

import { validate } from "../schemas/transaction.js";
import { TransactionModel } from "./../models/mysql/transaction.js";
import { request } from "express";
import { randomUUID } from "crypto";
import { convertDateToSaveDB } from "../utils/date.js";
import { filters } from '../utils/filter.js';

export class TransactionController {
	constructor() {
		this.model = TransactionModel;
	}

	getAll = async (req, res) => {
		const transactions = await this.model.getAll();
		res.json(transactions);
	};

	orderTransactionsByDate(transactions = []) {
		const response = {};

		transactions.forEach((transaction) => {
			const key = transaction.date_transaction;

			if (!response[key]) {
				response[key] = { group_key: key, content: [] };
			}

			response[key].content.push(transaction);
		});
		return Object.values(response);
	}

	getAllOrder = async (req = request, res) => {

		const { filter, value } = req.query;

		let transactions;

		if (filter && value) {
			const key = filters[filter];
			if (key) {
				transactions = await this.model.getAllOrderFilter(key, value);
			} else {
				transactions = await this.model.getAllOrder();
			}
		} else {
			transactions = await this.model.getAllOrder();
		}

		if (transactions.length === 1) {
			return res.json([]);
		}


		const groupedTransactions = transactions.reduce((acc, transaction) => {
			const { type_transaction_name } = transaction;

			if (!acc[type_transaction_name]) {
				acc[type_transaction_name] = {
					group_key: type_transaction_name,
					content: [],
				};
			}

			acc[type_transaction_name].content.push(transaction);
			return acc;
		}, {});

		const allTransactions =
			groupedTransactions["ALL"]?.content[0]?.transactions || [];
		const transactionsMap = new Map();

		allTransactions.forEach((transaction) => {
			if (transaction.code_transaction) {
				if (transactionsMap.has(transaction.code_transaction)) {
					const existingTransaction = transactionsMap.get(
						transaction.code_transaction
					);
					existingTransaction.type_transaction_name = "TRANSFER";
				} else {
					transactionsMap.set(
						transaction.code_transaction,
						transaction
					);
				}
			}
		});

		if (groupedTransactions["ALL"]) {
			groupedTransactions["ALL"].content[0].transactions = Array.from(
				transactionsMap.values()
			).sort(
				(a, b) =>
					new Date(b.date_transaction).getTime() -
					new Date(a.date_transaction).getTime()
			);
		}

		const transactionsValues = Object.values(groupedTransactions);
		res.json(transactionsValues);
	};

	getRecents = async (req, res) => {
		const transactions = await this.model.getRecents();
		res.json(transactions);
	};

	getTransationById = async (req = request, res) => {
		const transactions = await this.model.getTransationById(req.params.id);
		res.json(transactions);
	};

	getTransationByCode = async (req = request, res) => {
		const transactions = await this.model.getTransationByCode(
			req.params.code
		);
		res.json(transactions);
	};

	getIncomeAndExpenseByAccounts = async (req, res) => {
		const transactions = await this.model.getIncomeAndExpenseByAccounts();
		res.json(transactions);
	};

	getRevenuesAndExpendituresGeneral = async (req, res) => {
		const transactions =
			await this.model.getRevenuesAndExpendituresGeneral();
		res.json(transactions);
	};

	getAvailable = async (req, res) => {
		const transactions = await this.model.getAvailable();
		res.json(transactions);
	};

	getBalanceByBank = async (req, res) => {
		const transactions = await this.model.getBalanceByBank();
		res.json(transactions);
	};

	getBalanceByAccount = async (req, res) => {
		const transactions = await this.model.getBalanceByAccount();
		res.json(transactions);
	};

	getIncomeExpenseByTransaction = async (req, res) => {
		const transactions = await this.model.getIncomeExpenseByTransaction();
		res.json(transactions);
	};

	create = async (req, res) => {
		const result = validate(req.body);

		if (!result.success) {
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.message) });
		}

		const transaction = await this.model.create({
			...result.data,
			code_transaction: randomUUID(),
		});

		if (transaction) {
			return res
				.status(201)
				.json({ msg: "Registro ingresado correctamente." });
		}
	};

	createTransfer = async (req, res) => {
		const resultValidation = validate(req.body);

		if (!resultValidation.success) {
			return res
				.status(400)
				.json({ error: JSON.parse(resultValidation.error.message) });
		}

		const code_transaction = randomUUID();

		const insertEgress = await this.model.create({
			...resultValidation.data,
			concept_id: 1,
			code_transaction,
		});

		if (insertEgress) {
			const insertIncome = await this.model.create({
				...resultValidation.data,
				concept_id: 2,
				code_transaction,
			});
			if (insertIncome) {
				return res
					.status(201)
					.json({ msg: "Registro ingresado correctamente." });
			}

			return res
				.status(400)
				.json({ msg: "Error al ingresar el registro - Ingreso." });
		}

		return res
			.status(400)
			.json({ msg: "Error al ingresar el registro - Egreso." });
	};
}

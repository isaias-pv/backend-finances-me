import { validate } from "../schemas/transaction.js";
import { TransactionModel } from "./../models/mysql/transaction.js";
import { request } from 'express';
import { randomUUID } from 'crypto';
import { convertDateToSaveDB } from "../utils/date.js";

export class TransactionController {
	constructor() {
		this.model = TransactionModel;
	}

	getAll = async (req, res) => {
		const transactions = await this.model.getAll();
		res.json(transactions);
	};

	getAllOrder = async (req, res) => {
		const transactions = await this.model.getAll();
		const response = [];

		transactions.forEach(transaction => {
			const key = convertDateToSaveDB(transaction.date_transaction);


			const i = response.findIndex(item => item.group_key === key);
			
			if (i != -1) {
				response[i].content = [...response[i].content, transaction];
			} else {
				// }
				response.push({ group_key: key, content: [] });
			}
		});

		res.json(response);
	};

	getRecents = async (req, res) => {
		const transactions = await this.model.getRecents();
		res.json(transactions);
	};

	getTransationById = async (req = request, res) => {
		const transactions = await this.model.getTransationById(req.params.id);
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

		const transaction = await this.model.create({...result.data, code_transaction: randomUUID()});

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
			code_transaction
		});

		if (insertEgress) {
			const insertIncome = await this.model.create({
				...resultValidation.data,
				concept_id: 2,
				code_transaction
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

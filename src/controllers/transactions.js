import { validate } from "../schemas/transaction.js";
import { TransactionModel } from "./../models/mysql/transaction.js";
import { request } from 'express';
import { randomUUID } from 'crypto';

export class TransactionController {
	constructor() {
		this.model = TransactionModel;
	}

	getAll = async (req, res) => {
		const transactions = await this.model.getAll();
		res.json(transactions);
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

		const account = await this.model.create({...result.data, code_transaction: randomUUID()});

		return res.status(201).json(account);
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

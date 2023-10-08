// import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
import { TransactionModel } from  './../models/mysql/transaction.js';

export class TransactionController {

	constructor () {
		this.model = TransactionModel;
	  }

	getAll = async (req, res) => {
		const transactions = await this.model.getAll();
		res.json(transactions);
	};

	getIncomeAndExpenseByAccounts = async (req, res) => { 
		const transactions = await this.model.getIncomeAndExpenseByAccounts();
		res.json(transactions);
	};

	getRevenuesAndExpendituresGeneral = async (req, res) => { 
		const transactions = await this.model.getRevenuesAndExpendituresGeneral();
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
}

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
}

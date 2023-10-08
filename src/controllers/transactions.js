// import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class TransactionController {

	constructor ({ transactionModel }) {
		this.model = transactionModel
	  }

	getAll = async (req, res) => {		
		const transactions = await this.model.getAll();
		res.json(transactions);
	};
}

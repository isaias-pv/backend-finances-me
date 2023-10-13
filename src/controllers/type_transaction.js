import { searchByName } from "../schemas/general.js";
import { TypeTransactionModel } from "./../models/mysql/type_transactions.js";

export class TypeTransactionController {
	constructor() {
		this.model = TypeTransactionModel;
	}

	getAll = async (req, res) => {
		const concepts = await this.model.getAll();
		res.json(concepts);
	};

	findById = async (req, res) => {
		const { id } = req.params;
		const concepts = await this.model.findById(id);

		if (concepts) return res.json(concepts);
		res.status(404).json({ message: "type transaction not found" });
	};

	searchByName = async (req, res) => {
		const { query } = req.query;

		const result = searchByName({ query });
		if (!result.success)
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.message) });

		const concepts = await this.model.searchByName(query);

		if (concepts) return res.json(concepts);
		res.status(404).json({ message: "type transaction not found" });
	};
}

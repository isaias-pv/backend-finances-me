import { validate, validatePartial } from "./../schemas/bank.js";
import { searchByName } from "../schemas/general.js";
import { BankModel } from "./../models/mysql/bank.js";

export class BankController {
	constructor() {
		this.model = BankModel;
	}

	getAll = async (req, res) => {
		const banks = await this.model.getAll();
		res.json(banks);
	};

	getAllQuantityAccounts = async (req, res) => {
		const banks = await this.model.getAllQuantityAccounts();
		res.json(banks);
	};

	findById = async (req, res) => {
		const { id } = req.params;
		const banks = await this.model.findById(id);

		if (banks) return res.json(banks);
		res.status(404).json({ message: "bank not found" });
	};

	searchByName = async (req, res) => {
		const { query } = req.query;

		const result = searchByName({ query });
		if (!result.success)
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.message) });

		const banks = await this.model.searchByName(query);

		if (banks) return res.json(banks);
		res.status(404).json({ message: "banks not found" });
	};

	create = async (req, res) => {
		const result = validate(req.body);

		if (!result.success) {
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.message) });
		}

		const account = await this.model.create(result.data);

		return res.status(201).json({ mg: 'Banco creado correctamente' });
	};

	update = async (req, res) => {
		const { id } = req.params;
		const result = validatePartial(req.body);

		if (!result.success) {
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.message) });
		}

		const account = await this.model.update(id, result.data);

		return res.json(account);
	};

	delete = async (req, res) => {
		const { id } = req.params;

		const result = await this.model.delete(id);

		if (result === false) {
			return res.status(404).json({ message: "Account not found" });
		}

		return res.json({ message: "model deleted" });
	};
}

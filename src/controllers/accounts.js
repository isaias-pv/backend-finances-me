import { validate, validatePartial } from "../schemas/account.js";
import { searchByName } from "../schemas/general.js";
import { AccountModel } from "./../models/mysql/accounts.js";

export class AccountController {
	constructor() {
		this.model = AccountModel;
	}

	getAll = async (req, res) => {
		const accounts = await this.model.getAll();
		res.json(accounts);
	};

	findById = async (req, res) => {
		const { id } = req.params;
		const accounts = await this.model.findById(id);

		if (accounts) return res.json(accounts);
		res.status(404).json({ message: "Accounts not found" });
	};

	searchByName = async (req, res) => {
		const { query } = req.query;

		const result = searchByName({ query });
		if (!result.success)
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.message) });

		const accounts = await this.model.searchByName(query);

		if (accounts) return res.json(accounts);
		res.status(404).json({ message: "Accounts not found" });
	};

	findByBankId = async (req, res) => {
		const { id } = req.params;
		const accounts = await this.model.findByBankId(id);

		if (accounts) return res.json(accounts);
		res.status(404).json({ message: "Accounts not found" });
	};

	create = async (req, res) => {
		const result = validate(req.body);

		if (!result.success) {
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.message) });
		}

		const account = await this.model.create(result.data);

		return res.status(201).json({ msg: 'Cuenta creada correctamente' });
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

		return res.json({ message: "Movie deleted" });
	};
}

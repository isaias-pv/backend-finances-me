import { validate, validatePartial } from "../schemas/user.js";
import { searchByName } from "../schemas/general.js";
import { UserModel } from "./../models/mysql/user.js";
import { encrypt } from "../utils/encrypt.js";

export class UserController {
	constructor() {
		this.model = UserModel;
	}

	getAll = async (req, res) => {
		const users = await this.model.getAll();

		if (users) return res.json(users);
		res.status(404).json({ msg: "User not found!" });
	};

	findById = async (req, res) => {
		const { id } = req.params;
		const users = await this.model.findById(id);

		if (users) return res.json(users);
		res.status(404).json({ msg: "User not found!" });
	};

	searchByName = async (req, res) => {
		const { query } = req.query;

		const result = searchByName({ query });
		if (!result.success)
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.msg) });

		const users = await this.model.searchByName(query);

		if (users) return res.json(users);
		res.status(404).json({ msg: "User not found" });
	};

	create = async (req, res) => {
		const result = validate(req.body);

		if (!result.success) {
			return res.status(400).json({ error: result.error.errors });
		}

		const user = await this.model.searchByName(result.data.username);

		if (user.length > 0) {
			return res.status(400).json({ msg: "El usuario existe" });
		}

		const password_encrypt = await encrypt(result.data.password);

		const account = await this.model.create({
			...result.data,
			password: password_encrypt,
		});

		return res.status(201).json({ msg: "Usuario creado correctamente" });
	};

	update = async (req, res) => {
		const { id } = req.params;
		const result = validatePartial(req.body);

		if (!result.success) {
			return res
				.status(400)
				.json({ error: JSON.parse(result.error.msg) });
		}

		const account = await this.model.update(id, result.data);

		return res.json({ msg: "Usuario actualizado correctamente" });
	};

	delete = async (req, res) => {
		const { id } = req.params;

		const result = await this.model.delete(id);

		if (result === false) {
			return res.status(404).json({ msg: "User not found" });
		}

		return res.json({ msg: "Usuario eliminado correctamente" });
	};
}

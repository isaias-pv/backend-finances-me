import { request } from "express";
import { searchByName } from "../schemas/general.js";
import { ConceptModel } from "./../models/mysql/concept.js";

export class ConceptController {
	constructor() {
		this.model = ConceptModel;
	}

	getAll = async (req = request, res) => {
		
		const { all } = req.query;

		if (all && all === true) {
			res.json(await this.model.getAll());
			return
		}

		res.json(await this.model.getOnlyVisible());
	};

	findById = async (req, res) => {
		const { id } = req.params;
		const concepts = await this.model.findById(id);

		if (concepts) return res.json(concepts);
		res.status(404).json({ message: "concept not found" });
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
		res.status(404).json({ message: "concepts not found" });
	};

	getByTypeTransactionId = async (req, res) => {
		const { id } = req.params;
		const concepts = await this.model.findByTypeTransactionId(id);

		if (concepts) return res.json(concepts);
		res.status(404).json({ message: "concepts not found" });
	};
}

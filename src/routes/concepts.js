import { Router } from "express";
import { ConceptController } from "./../controllers/concept.js";

export const conceptRouter = () => {
	const router = Router();

	const controller = new ConceptController();

	router.get("/", controller.getAll);
	router.get("/:id", controller.findById);
	router.get("/search", controller.searchByName);

	return router;
};

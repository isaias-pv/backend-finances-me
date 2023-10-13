import { Router } from "express";
import { BankController } from "./../controllers/bank.js";

export const banksRouter = () => {
	const router = Router();

	const controller = new BankController();

	router.get("/", controller.getAll);
	router.get("/:id", controller.findById);
	router.get("/search", controller.searchByName);

	router.post("/create", controller.create);

	router.put("/:id", controller.update);

	router.delete("/:id", controller.delete);

	return router;
};

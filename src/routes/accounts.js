import { Router } from "express";
import { AccountController } from "./../controllers/accounts.js";

export const accountsRouter = () => {
	const router = Router();

	const controller = new AccountController();

	router.get("/", controller.getAll);
	router.get("/:id", controller.findById);
	router.get("/bank/:id", controller.findByBankId);
	router.get("/search", controller.searchByName);

	router.post("/create", controller.create);

	router.put("/:id", controller.update);

	router.delete("/:id", controller.delete);

	return router;
};

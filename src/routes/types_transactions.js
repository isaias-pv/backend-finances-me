import { Router } from "express";
import { TypeTransactionController } from "./../controllers/type_transaction.js";

export const typesTransactionsRouter = () => {
	const router = Router();

	const controller = new TypeTransactionController();

	router.get("/", controller.getAll);
	router.get("/:id", controller.findById);
	router.get("/search", controller.searchByName);

	return router;
};

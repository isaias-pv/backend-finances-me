import { Router } from "express";
import { TransactionController } from './../controllers/transactions.js';

export const transactionRouter = () => {
	const router = Router();

	const controller = new TransactionController();

	router.get("/", controller.getAll);

	return router;
};

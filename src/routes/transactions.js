import { Router } from "express";
import { TransactionController } from './../controllers/transactions.js';

export const transactionRouter = ({ transactionModel }) => {
	const router = Router();

	const model = new TransactionController({ transactionModel });

	router.get("/", model.getAll);

	return router;
};

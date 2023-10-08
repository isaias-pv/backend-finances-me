import { Router } from "express";
import { TransactionController } from './../controllers/transactions.js';

export const transactionRouter = () => {
	const router = Router();

	const controller = new TransactionController();

	router.get("/", controller.getAll);
	router.get("/incomes-expenses-by-accounts", controller.getIncomeAndExpenseByAccounts);
	router.get("/incomes-expenses", controller.getRevenuesAndExpendituresGeneral);

	return router;
};

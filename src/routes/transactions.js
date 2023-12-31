import { Router } from "express";
import { TransactionController } from "./../controllers/transactions.js";

export const transactionRouter = () => {
	const router = Router();

	const controller = new TransactionController();

	router.get("/", controller.getAll);
	router.get("/order", controller.getAllOrder);
	router.get("/recents", controller.getRecents);
	router.get(
		"/incomes-expenses-by-accounts",
		controller.getIncomeAndExpenseByAccounts
	);
	router.get(
		"/incomes-expenses",
		controller.getRevenuesAndExpendituresGeneral
	);
	router.get("/available", controller.getAvailable);
	router.get("/balance-by-bank", controller.getBalanceByBank);
	router.get("/balance-by-account", controller.getBalanceByAccount);
	router.get(
		"/incomes-expenses-by-transactions",
		controller.getIncomeExpenseByTransaction
	);

	router.get("/:id", controller.getTransationById);
	router.get("/code/:code", controller.getTransationByCode);

	router.post("/create", controller.create);
	router.post("/transfer/create", controller.createTransfer);

	return router;
};

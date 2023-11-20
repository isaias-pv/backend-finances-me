import express, { json } from "express"; // require -> commonJS
import "dotenv/config";

import { corsMiddleware } from "./src/middlewares/cors.js";

import { transactionRouter } from "./src/routes/transactions.js";
import { accountsRouter } from "./src/routes/accounts.js";
import { banksRouter } from "./src/routes/banks.js";
import { conceptRouter } from "./src/routes/concepts.js";
import { typesTransactionsRouter } from "./src/routes/types_transactions.js";
import { usersRouter } from "./src/routes/user.js";
import { authRouter } from "./src/routes/auth.js";
import { verifyToken } from "./src/middlewares/token.js";

export const createApp = () => {
	const app = express();
	app.use(json());
	// app.use(corsMiddleware());
	app.disable("x-powered-by");

	app.use("/transactions", [corsMiddleware, verifyToken], transactionRouter());
	app.use("/accounts", [corsMiddleware, verifyToken], accountsRouter());
	app.use("/banks", [corsMiddleware, verifyToken], banksRouter());
	app.use("/concepts", [corsMiddleware, verifyToken], conceptRouter());
	app.use("/type_transactions", [corsMiddleware, verifyToken], typesTransactionsRouter());
	app.use("/users", [corsMiddleware, verifyToken], usersRouter());
	app.use("/auth", corsMiddleware, authRouter());

	const PORT = process.env.PORT ?? 1234;

	app.listen(PORT, () => {
		console.log(`server listening on port http://localhost:${PORT}`);
	});
};

createApp();

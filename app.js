import express, { json } from "express"; // require -> commonJS
import "dotenv/config";

import { corsMiddleware } from "./src/middlewares/cors.js";

import { transactionRouter } from "./src/routes/transactions.js";
import { accountsRouter } from "./src/routes/accounts.js";
import { banksRouter } from "./src/routes/banks.js";
import { conceptRouter } from "./src/routes/concepts.js";
import { typesTransactionsRouter } from "./src/routes/types_transactions.js";

export const createApp = () => {
	const app = express();
	app.use(json());
	app.use(corsMiddleware());
	app.disable("x-powered-by");

	app.use("/transactions", transactionRouter());
	app.use("/accounts", accountsRouter());
	app.use("/banks", banksRouter());
	app.use("/concepts", conceptRouter());
	app.use("/type_transactions", typesTransactionsRouter());

	const PORT = process.env.PORT ?? 1234;

	app.listen(PORT, () => {
		console.log(`server listening on port http://localhost:${PORT}`);
	});
};

createApp();

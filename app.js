import express, { json } from "express"; // require -> commonJS
import "dotenv/config";

import { corsMiddleware } from "./src/middlewares/cors.js";
import { transactionRouter } from "./src/routes/transactions.js";
import { TransactionModel } from "./src/models/mysql/transaction.js";

export const createApp = ({ model }) => {
	const app = express();
	app.use(json());
	app.use(corsMiddleware());
	app.disable("x-powered-by");

	app.use("/transactions", transactionRouter({ transactionModel: model }));

	const PORT = process.env.PORT ?? 1234;

	app.listen(PORT, () => {
		console.log(`server listening on port http://localhost:${PORT}`);
	});
};

createApp({ model: TransactionModel });

import express, { json } from "express"; // require -> commonJS
import "dotenv/config";

import { corsMiddleware } from "./src/middlewares/cors.js";

import { transactionRouter } from "./src/routes/transactions.js";

export const createApp = () => {
	const app = express();
	app.use(json());
	app.use(corsMiddleware());
	app.disable("x-powered-by");

	app.use("/transactions", transactionRouter());

	const PORT = process.env.PORT ?? 1234;

	app.listen(PORT, () => {
		console.log(`server listening on port http://localhost:${PORT}`);
	});
};

createApp();

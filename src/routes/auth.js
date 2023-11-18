import { Router } from "express";
import { AuthController } from "./../controllers/auth.js";

export const authRouter = () => {
	const router = Router();

	const controller = new AuthController();

	router.post("/sign_in", controller.signIn);

	return router;
};

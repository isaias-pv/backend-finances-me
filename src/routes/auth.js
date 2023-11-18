import { Router } from "express";
import { AuthController } from "./../controllers/auth.js";

export const authRouter = () => {
	const router = Router();

	const controller = new AuthController();

	router.post("/sign-in", controller.signIn);

	return router;
};

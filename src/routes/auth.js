import { Router } from "express";
import { AuthController } from "./../controllers/auth.js";
import { UserController } from "../controllers/user.js";

export const authRouter = () => {
	const router = Router();

	const controller = new AuthController();
	const userController = new UserController();

	router.post("/sign-in", controller.signIn);
	router.post("/sign-up", userController.create);

	return router;
};

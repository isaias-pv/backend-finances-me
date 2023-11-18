import { Router } from "express";
import { UserController } from "./../controllers/user.js";

export const usersRouter = () => {
	const router = Router();

	const controller = new UserController();

	router.get("/", controller.getAll);
	router.get("/:id", controller.findById);
	router.get("/search", controller.searchByName);

	router.post("/create", controller.create);

	router.put("/:id", controller.update);

	router.delete("/:id", controller.delete);

	return router;
};

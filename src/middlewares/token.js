import { request, response } from "express";
import { expiredJWT, verifyJWT } from "../utils/jwt.js";

export const verifyToken = async (req = request, res = response, next) => {
	const {
		headers: { authorization },
	} = req;

	if (!authorization) {
		return res.status(401).json({ msg: "Invalid authorization" });
	}

	const response = await expiredJWT(authorization);

	if (!response) {
		return res.status(401).json({ msg: "Unauthorized" });
	}

	next();

};

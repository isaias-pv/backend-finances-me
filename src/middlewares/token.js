import { request, response } from "express";
import { expiredJWT, verifyJWT } from "../utils/jwt.js";

export const verifyToken = async (req = request, res = response, next) => {
    const {
        headers: { authorization },
        originalUrl,
        method // Método HTTP utilizado (GET, POST, etc.)
    } = req;

	  // Verificar si estamos en la ruta '/auth/sign-in/' y es un método POST
	  if (originalUrl === "/auth/sign-in/" && method === "POST") {
        return next(); // Omitir el middleware y continuar con la ruta
    }
	
    if (!authorization) {
        return res.status(401).json({ msg: "Invalid authorization" });
    }

    const response = await expiredJWT(authorization);

    if (!response) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    // Si no estamos en la ruta '/auth/sign-in/' o no es un método POST, aplicar el middleware
    next();
};

import z from "zod";

const passwordRegex = new RegExp(
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
);

const userSchema = z.object({
	name: z.string({
		invalid_type_error: "Tipo de dato inválido",
		required_error: "Nombre es requerido.",
	}),
	username: z.string({
		invalid_type_error: "Tipo de dato inválido",
		required_error: "Nombre de usuario es requerido.",
	}),
	email: z
		.string({
			invalid_type_error: "Tipo de dato inválido",
			required_error: "Correo es requerido.",
		})
		.email(),
	password: z
		.string({
			invalid_type_error: "Tipo de dato inválido",
			required_error: "Contraseña es requerida.",
		})
		.regex(passwordRegex, {
			message: "Estructura de contraseña inválida",
		}),
});

export function validate(params) {
	return userSchema.safeParse(params);
}

export function validatePartial(params) {
	return userSchema.partial().safeParse(params);
}

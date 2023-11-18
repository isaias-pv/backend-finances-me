import z from "zod";

const bankSchema = z.object({
	name: z.string({
		invalid_type_error: "Tipo de dato inválido",
		required_error: "Nombre requerido.",
	})
});

export function validate(params) {
	return bankSchema.safeParse(params);
}

export function validatePartial(params) {
	return bankSchema.partial().safeParse(params);
}

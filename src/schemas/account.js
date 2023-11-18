import z from "zod";

const accountSchema = z.object({
	name: z.string({
		invalid_type_error: "Tipo de dato inválido",
		required_error: "Nombre requerido.",
	}),
	balance: z.string({
		invalid_type_error: "Tipo de dato inválido",
	}),
	bank_id: z
		.number({
			invalid_type_error: "Tipo de dato inválido",
			required_error: "El banco es requerido.",
		})
		.int()
		.min(1)
});

export function validate(params) {
	return accountSchema.safeParse(params);
}

export function validatePartial(params) {
	return accountSchema.partial().safeParse(params);
}

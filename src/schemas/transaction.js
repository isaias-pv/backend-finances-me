import z from "zod";

export function validate(content) {
	return z
		.object({
			type_transaction_id: z
				.number({
					invalid_type_error: "Tipo de dato inválido",
				})
				.int()
				.min(1)
				.optional(),
			date_transaction: z.string().datetime({ offset: true }).max(new Date(), { message: 'Ingrese una fecha menor al día de hoy.' }).optional(),
			amount: z.string({
				invalid_type_error: "Tipo de dato inválido",
				required_error: "El monto es requerido.",
			}),
			concept_id: z
				.number({
					invalid_type_error: "Tipo de dato inválido",
				})
				.int()
				.min(1)
				.optional(),
			observation: z.string({
				invalid_type_error: "Tipo de dato inválido",
			}).optional(),
			account_origin_id: z
				.number({
					invalid_type_error: "Tipo de dato inválido",
					required_error: "La cuenta de origen es requeridaks.",
				})
				.int()
				.min(1),
			account_destination_id: z
				.number({
					invalid_type_error: "Tipo de dato inválido",
				})
				.int()
				.min(1).optional(),
		})
		.safeParse(content);
}

import z from "zod";

export function validate(content) {
	return z
		.object({
			type_transaction_id: z
				.number({
					invalid_type_error: "Error de tipo",
				})
				.int()
				.min(1)
				.optional(),
			date_transaction: z.date().optional(),
			amount: z.string({
				invalid_type_error: "Error de tipo",
				required_error: "El monto es requerido.",
			}),
			concept_id: z
				.number({
					invalid_type_error: "Error de tipo",
				})
				.int()
				.min(1)
				.optional(),
			observation: z.string({
				invalid_type_error: "Error de tipo",
			}).optional(),
			account_origin_id: z
				.number({
					invalid_type_error: "Error de tipo",
					required_error: "La cuenta de origen es requeridaks.",
				})
				.int()
				.min(1),
			account_destination_id: z
				.number({
					invalid_type_error: "Error de tipo",
				})
				.int()
				.min(1).optional(),
		})
		.safeParse(content);
}

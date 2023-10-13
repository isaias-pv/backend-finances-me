import z from "zod";

export function validate(content) {
	return z
		.object({
			type_transaction_id: z
				.number({
					invalid_type_error: "Invalid type",
					required_error: "Name is required.",
				})
				.int()
				.min(1),
			date_transaction: z.optional().date(),
			amount: z.string({
				invalid_type_error: "Invalid type",
			}),
			concept_id: z
				.number({
					invalid_type_error: "Invalid type",
				})
				.int()
				.min(1),
			observation: z.string({
				invalid_type_error: "Invalid type",
			}),
			account_origin_id: z
				.number({
					invalid_type_error: "Invalid type",
				})
				.int()
				.min(1),
			account_destination_id: z
				.number({
					invalid_type_error: "Invalid type",
				})
				.int()
				.min(1),
		})
		.safeParse(content);
}

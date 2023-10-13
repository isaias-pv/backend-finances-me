import z from "zod";

const accountSchema = z.object({
	name: z.string({
		invalid_type_error: "Invalid type",
		required_error: "Name is required.",
	}),
	balance: z.string({
		invalid_type_error: "Invalid type",
	}),
	bank_id: z
		.number({
			invalid_type_error: "Invalid type",
			required_error: "Name is required.",
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

import z from "zod";

const bankSchema = z.object({
	name: z.string({
		invalid_type_error: "Invalid type",
		required_error: "Name is required.",
	})
});

export function validate(params) {
	return bankSchema.safeParse(params);
}

export function validatePartial(params) {
	return bankSchema.partial().safeParse(params);
}

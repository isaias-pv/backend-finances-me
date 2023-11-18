import z from "zod";

const passwordRegex = new RegExp(
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
);

const userSchema = z.object({
	username: z.string({
		invalid_type_error: "Invalid type",
		required_error: "Username is required",
	}),
	password: z
		.string({
			invalid_type_error: "Invalid type",
			required_error: "Password is required.",
		})
		.regex(passwordRegex, {
			message: "Password must be at least",
		}),
});

export function validate(params) {
	return userSchema.safeParse(params);
}

export function validatePartial(params) {
	return userSchema.partial().safeParse(params);
}

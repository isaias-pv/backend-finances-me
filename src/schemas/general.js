import z from "zod";

export function searchByName(params) {
	return z.object({
		query: z.string({
			invalid_type_error: "Invalid type",
			required_error: "Query is required.",
		}),
	}).safeParse(params);
}
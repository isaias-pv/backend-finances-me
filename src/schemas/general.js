import z from "zod";

export function searchByName(params) {
	return z.object({
		query: z.string({
			invalid_type_error: "Tipo de dato inválido",
			required_error: "Query es requerida.",
		}),
	}).safeParse(params);
}
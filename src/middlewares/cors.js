import cors from "cors";

const ACCEPTED_ORIGINS = [
	"*",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
	cors('*');

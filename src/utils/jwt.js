import * as jose from "jose";

const SECRET_KEY = new TextEncoder().encode(
	"cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);

export async function generateJWT(data) {
	const alg = "HS256";

	const jwt = await new jose.SignJWT(data)
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setIssuer("urn:example:issuer")
		.setAudience("urn:example:audience")
		.setExpirationTime("2h")
		.sign(SECRET_KEY);

	return jwt;
}

export function decodeJWT(token) {
	const { data } = jose.decodeJwt(token);

	if (!data)  return false;

	return data;

}

export async function verifyJWT(token) {
	try {
		const { payload } = await jose.jwtVerify(token, SECRET_KEY);
	
		if (!payload.data)  return false;
	
		return payload;
	} catch (error) {
		return false
	}
}

export async function expiredJWT(token) {
	const validateToken = await verifyJWT(token);

	if (!validateToken) return false;

	const { exp } = validateToken;

	const dateExpiration = new Date(exp * 1000);
	const now = new Date();

	return dateExpiration > now;
}

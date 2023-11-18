import { validate, validatePartial } from "../schemas/auth.js";
import { compare, encrypt } from "../utils/encrypt.js";
import { decodeJWT, expiredJWT, generateJWT, verifyJWT } from "../utils/jwt.js";
import { AuthModel } from "./../models/mysql/auth.js";

export class AuthController {
	constructor() {
		this.model = AuthModel;
	}

	signIn = async (req, res) => {		
		const result = validate(req.body);

		if (!result.success) {
			return res
				.status(400)
				.json({ error: result.error.issues });
		}

		const { username, password } = result.data;

		const responseUser = await this.model.getUser({ username }).catch((err) => {
			res.status(500).json({ msg: err.message });
		});
		
		if (responseUser.length === 0) {
			return res.status(404).json({ msg: 'User not found!'});
		}

		const { password: password_bd, ...user } = responseUser[0];

		const comparePassword = await compare(password_bd, password).catch((err) => {
			res.status(500).json({ msg: err.message });
		});			

		if (!comparePassword) {
			return res.status(400).json({ msg: 'Invalid credentials!'});
		}

		const jwt = await generateJWT({ data: user.user_id});

		return res.status(200).json({ user, token: jwt });
	};
}

import { connection } from "./query.js";

export class AuthModel {
	static async getUser({ username }) {
		const [users] = await connection.query(
			`SELECT * FROM users WHERE username = ?;`,
			[username]
		);

		return users;
	}

	static async verifyUser({ username, password }) {
		const [users] = await connection.query(
			`SELECT * FROM users WHERE username = ? AND password = ?;`,
			[username, password]
		);

		return users;
	}


}

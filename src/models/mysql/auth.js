import { connection } from "./query.js";

export class AuthModel {
	static async getUser({ username }) {
		const { rows } = await connection.query(
			"SELECT * FROM users WHERE username = $1",
			[username]
		);

		return rows;
	}

	static async verifyUser({ username, password }) {
		const { rows } = await connection.query(
			`SELECT * FROM users WHERE username = $1 AND password = $2;`,
			[username, password]
		);

		return rows;
	}
}

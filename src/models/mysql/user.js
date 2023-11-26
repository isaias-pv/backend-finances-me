import { connection } from "./query.js";

export class UserModel {
	static async getAll() {
		const { rows } = await connection.query(`SELECT * FROM users;`);

		return rows;
	}

	static async findById(id) {
		const { rows } = await connection.query(
			`SELECT * FROM users WHERE user_id = $1;`,
			[id]
		);

		return rows;
	}

	static async searchByName(name) {
		const { rows } = await connection.query(
			`SELECT * FROM users WHERE name LIKE ('%$1%') OR username ('%$2%');`,
			[name, name]
		);

		return rows;
	}

	static async create({ name, username, email, password }) {
		const { rows } = await connection.query(
			`INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4);`,
			[name, username, email, password]
		);

		return rows;
	}

	static async update(id, { name, username, email, password }) {
		const { rows } = await connection.query(
			`UPDATE users SET 
				name = $1, 
				username = $2, 
				email = $3, 
				password = $4
			WHERE user_id = $5;`,
			[name, username, email, password, id]
		);

		return rows;
	}

	static async delete(id) {
		const { rows } = await connection.query(
			`DELETE FROM users WHERE user_id $1;`,
			[id]
		);

		return rows;
	}
}

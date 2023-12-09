import { connection } from "./query.js";

export class UserModel {
	static async getAll() {
		const [users] = await connection.query(`SELECT * FROM users;`);

		return users;
	}

	static async findById(id) {
		const [users] = await connection.query(
			`SELECT * FROM users WHERE user_id = ?;`,
			[id]
		);

		return users;
	}

	static async searchByName(name = '') {
		name = `%${name}%`
		const [users] = await connection.query(
			`SELECT * FROM users WHERE name LIKE (?) OR username LIKE (?);`,
			[name, name]
		);

		return users;
	}

	static async create({ name, username, email, password }) {
		const [user] = await connection.query(
			`INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?);`,
			[name, username, email, password]
		);

		return user;
	}

	static async update(id, { name, username, email, password }) {
		const [user] = await connection.query(
			`UPDATE users SET 
				name = ?, 
				username = ?, 
				email = ?, 
				password = ?
			WHERE user_id = ?;`,
			[name, username, email, password, id]
		);

		return user;
	}

	static async delete(id) {
		const [user] = await connection.query(`DELETE FROM users WHERE user_id ?;`, [
			id,
		]);

		return user;
	}
}

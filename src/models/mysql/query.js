import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
	host: "localhost",
	user: "root",
	port: 3306,
	password: "2133002Isaias_",
	database: "finance_db",
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export { connection };

// export class Connection {
// 	DEFAULT_CONFIG = {
// 		host: "localhost",
// 		user: "root",
// 		port: 3306,
// 		password: "2133002Isaias_",
// 		database: "finance_db",
// 	};

// 	connection;

// 	connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

// 	constructor() {
// 		this.createConnection(this.connectionString);
// 	}

// 	async createConnection(connectionString) {
// 		this.connection = await mysql.createConnection(connectionString);
// 	}

// 	async getConnection() {
// 		return this.connection;
// 	}

// 	query() { 
// 		this.connection
// 	}
// }

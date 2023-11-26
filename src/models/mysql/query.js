import pg from 'pg';

const DEFAULT_CONFIG = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    port: process.env.DB_PORT || "5432",
    password: process.env.DB_PASS || "2133002Isaias_",
    database: process.env.DB_NAME || "finance-me_db",
};

const connectionString = process.env.DATABASE_URL || null;

const connection = connectionString ? new pg.Pool({ connectionString }) : new pg.Pool(DEFAULT_CONFIG);

export { connection };

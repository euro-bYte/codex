import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { IDB } from '../Interfaces/IDB';

// Load environment variables from .env file
dotenv.config();

// Create the database connection pool using environment variables
const dbPool: mysql.Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the connection pool as part of the IDB interface
export const dbConx: IDB = {
    dbPool: dbPool,
};

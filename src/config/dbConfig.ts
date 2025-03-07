import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from '../environments/env';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config: sql.config = {
    user: DB_USER ,
    password: DB_PASS ,
    server: DB_HOST ,
    database: DB_NAME ,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

export default config;
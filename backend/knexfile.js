import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default {
    client: 'pg',
    connection: {
        connectionString: process.env.conn_string,
        host: process.env.host,
        port: process.env.db_port,
        user: process.env.user,
        database: process.env.db,
        password: String(process.env.password || '').trim()
    },
    migrations: {
        tablename: 'migrations',
        directory: `${__dirname}/src/database`
    }
};

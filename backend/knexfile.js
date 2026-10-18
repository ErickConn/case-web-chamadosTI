require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: {
        connectionString: process.env.conn_string,
        host: process.env.host,
        port: process.env.db_port,
        user: process.env.user,
        database: process.env.db,
        password: process.env.password
    },
    migrations: {
        tablename: 'migrations',
        directory: `${__dirname}/src/database`
    }
}
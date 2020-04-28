import { createPool } from 'promise-mysql';

export async function connect() {

    const connection = await createPool({
        host: 'localhost',
        user: 'express',
        password: 'express1234',
        database: 'node_mysql_ts',
        connectionLimit: 10
    });
    return connection;

}
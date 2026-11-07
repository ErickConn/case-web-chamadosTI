import knex from 'knex';
import config from '../../knexfile.js';

const database = knex(config);

export default database;

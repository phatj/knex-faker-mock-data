import knex from 'knex';
import config from '../../knexfile';

(async () => {
  const {
    connection: { database },
  } = config.development;

  config.development.connection.database = null;
  const command = `CREATE DATABASE ${database};`;

  const db = knex(config.development);

  try {
    await db.raw(command);
  } catch (error) {
    console.error(error.message);
  }

  await db.destroy();
})();

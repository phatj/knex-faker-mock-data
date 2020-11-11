export const up = async function (knex) {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('email').unique();
    table.string('phoneNumber');
    table.jsonb('welcomeTexts');
  });
};

export const down = async function (knex) {
  await knex.schema.dropTable('user');
};

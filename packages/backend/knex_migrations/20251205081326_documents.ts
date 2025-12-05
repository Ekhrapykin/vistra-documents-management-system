import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists('documents', (table) => {
    table.bigIncrements('id').primary();
    table.string('name', 255).notNullable();
    table.string('created_by', 255).notNullable();
    table.boolean('is_deleted').defaultTo(false);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at')
      .defaultTo(knex.fn.now())
      .alter();  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('documents');
}


import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('documents');
  if (!exists) {
    await knex.schema.createTable('documents', (table) => {
      table.bigIncrements('id').primary();
      table.bigInteger('folder_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('folders')
        .onDelete('SET NULL');

      table.string('name', 255).notNullable();
      table.string('created_by', 255).notNullable();
      table.bigInteger('file_size_bytes').unsigned().defaultTo(0);

      table.boolean('is_deleted').defaultTo(false);

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at').defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('documents');
}

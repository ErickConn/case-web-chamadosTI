/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const hasColumn = await knex.schema.hasColumn('avaliacao', 'nota');
    if (!hasColumn) {
        await knex.schema.alterTable('avaliacao', function (table) {
            table.integer('nota').nullable();
        });
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    const hasColumn = await knex.schema.hasColumn('avaliacao', 'nota');
    if (hasColumn) {
        await knex.schema.alterTable('avaliacao', function (table) {
            table.dropColumn('nota');
        });
    }
}

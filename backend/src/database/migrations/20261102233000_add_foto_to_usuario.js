/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const hasColumn = await knex.schema.hasColumn('usuario', 'foto');
    if (!hasColumn) {
        return knex.schema.alterTable('usuario', function (table) {
            table.text('foto').nullable();
        });
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    const hasColumn = await knex.schema.hasColumn('usuario', 'foto');
    if (hasColumn) {
        return knex.schema.alterTable('usuario', function (table) {
            table.dropColumn('foto');
        });
    }
}


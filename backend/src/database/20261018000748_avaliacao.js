/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('avaliacao', function (table) {
        table.increments();
        table.text('comentario');
        table.date('data');
        table.integer('solucaoId').unsigned();
        table.foreign('solucaoId').references('solucao.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('avaliacao');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('solucao', function (table) {
        table.increments();
        table.text('descricao');
        table.date('data');
        table.enu('status', ['aguardando resposta', 'aceita', 'rejeitada']).notNullable;
        table.integer('chamadoId').unsigned();
        table.foreign('chamadoId').references('chamado.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('solucao');
};

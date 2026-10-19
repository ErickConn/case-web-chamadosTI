/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('solucao', function (table) {
        table.increments();
        table.text('descricao');
        table.date('data');
        table.enu('status', ['aguardando resposta', 'aceita', 'rejeitada']).notNullable();
        table.integer('chamadoId').unsigned();
        table.foreign('chamadoId').references('chamado.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('solucao');
};

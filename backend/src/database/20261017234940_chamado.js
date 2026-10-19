/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('chamado', function (table) {
        table.increments();
        table.string('titulo').notNullable;
        table.enu('status', ['aberto', 'aguardando resposta', 'fechado', 'resolvido']).notNullable;
        table.text('descricao');
        table.string('categoria');
        table.enu('prioridade', ['baixa', 'média', 'alta', 'urgente']);
        table.integer('userId').unsigned();
        table.integer('tecnicoId').unsigned();
        table.foreign('userId').references('usuario.id');
        table.foreign('tecnicoId').references('usuario.id');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('chamado');
};

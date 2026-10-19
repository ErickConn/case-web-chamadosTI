/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('usuario', function (table) {
        table.increments();
        table.string('nome').notNullable;
        table.string('email').notNullable;
        table.string('senha').notNullable;
        table.string('cargo');
        table.string('setor');
        table.enu('tipo_perfil', ['solicitante', 'técnico']).notNullable;
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('usuario')
};

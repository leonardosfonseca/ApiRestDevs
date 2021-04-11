exports.up = (knex) => {
  return knex.schema.createTable('devs', (t) => {
    t.increments('id').primary();
    t.string('nome');
    t.specificType('sexo', 'CHAR(1)');
    t.integer('idade');
    t.string('hobby');
    t.date('datanascimento');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('devs');
};

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('devs').where(filter).select();
  };

  const find = async (filter = {}) => {
    const result = await app.db('devs').where(filter).first();
    if (!result) return { error: 'Nao existe Desenvolvedor cadastrado com o ID informado' };
    return result;
  };

  const update = async (id, dev) => {
    const result = await find({ id });
    if (result.error) return result;
    return app.db('devs')
      .where({ id })
      .update(dev, '*');
  };

  const remove = async (id) => {
    const result = await find({ id });
    if (result.error) return result;
    return app.db('devs')
      .where({ id })
      .delete();
  };

  const save = (dev) => {
    if (!dev.nome) return { error: 'Nome é um atributo obrigatorio' };
    if (!dev.sexo) return { error: 'Sexo é um atributo obrigatorio' };
    if (!dev.idade) return { error: 'Idade é um atributo obrigatorio' };
    if (!dev.hobby) return { error: 'Hobby é um atributo obrigatorio' };
    if (!dev.datanascimento) return { error: 'Data de nascimento é um atributo obrigatorio' };
    return app.db('devs').insert(dev, '*');
  };

  return {
    findAll, save, find, update, remove,
  };
};

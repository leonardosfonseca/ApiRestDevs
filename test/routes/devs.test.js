const request = require('supertest');

const app = require('../../src/app');

test('Deve listar todos os Desenvolvedores', () => {
  return request(app).get('/developers')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir um Desenvolvedor com sucesso', () => {
  return request(app).post('/developers')
    .send({
      nome: 'Leo', sexo: 'M', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.nome).toBe('Leo');
    });
});

test('Deve retornar um Desenvolvedor por ID', () => {
  const nome = `Leo${Date.now()}`;
  return app.db('devs')
    .insert({
      nome, sexo: 'M', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    }, ['id'])
    .then((devs) => request(app).get(`/developers/${devs[0].id}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe(nome);
    });
});

test('Deve atualizar um Desenvolvedor por ID', () => {
  return app.db('devs')
    .insert({
      nome: 'Leo atualizar', sexo: 'M', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    }, ['id'])
    .then((devs) => request(app).put(`/developers/${devs[0].id}`)
      .send({ nome: 'Leo atualizado' }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('Leo atualizado');
    });
});

test('Deve remover um Desenvolvedor por ID', () => {
  return app.db('devs')
    .insert({
      nome: 'Leo remover', sexo: 'M', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    }, ['id'])
    .then((devs) => request(app).delete(`/developers/${devs[0].id}`))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

// validações dos campos
test('Nao deve inserir dev sem nome', () => {
  return request(app).post('/developers')
    .send({
      sexo: 'M', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatorio');
    });
});

test('Nao deve inserir dev sem sexo', () => {
  return request(app).post('/developers')
    .send({
      nome: 'Leo', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Sexo é um atributo obrigatorio');
    });
});

test('Nao deve inserir dev sem idade', () => {
  return request(app).post('/developers')
    .send({
      nome: 'Leo', sexo: 'M', hobby: 'Audio', datanascimento: '1998-10-03',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Idade é um atributo obrigatorio');
    });
});

test('Nao deve inserir dev sem hobby', () => {
  return request(app).post('/developers')
    .send({
      nome: 'Leo', sexo: 'M', idade: '22', datanascimento: '1998-10-03',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Hobby é um atributo obrigatorio');
    });
});

test('Nao deve inserir dev sem data de nascimento', () => {
  return request(app).post('/developers')
    .send({
      nome: 'Leo', sexo: 'M', idade: '22', hobby: 'Audio',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Data de nascimento é um atributo obrigatorio');
    });
});

test('Deve retornar 400 caso nao exista o registro ao atualizar um desenvolvedor', () => {
  return app.db('devs')
    .insert({
      nome: 'Leo atualizar', sexo: 'M', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    }, ['id'])
    .then((devs) => request(app).put(`/developers/${devs[0].id}1`)
      .send({ nome: 'Leo atualizado' }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nao existe Desenvolvedor cadastrado com o ID informado');
    });
});

test('Deve retornar 400 caso nao exista o registro ao pesquisar um Desenvolvedor por ID', () => {
  return app.db('devs')
    .insert({
      nome: 'Leo atualizar', sexo: 'M', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    }, ['id'])
    .then((devs) => request(app).get(`/developers/${devs[0].id}1`)
      .send({ nome: 'Leo atualizado' }))
    .then((res) => {
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Nao existe Desenvolvedor cadastrado com o ID informado');
    });
});

test('Deve retornar 400 caso nao exista o registro deletar um Desenvolvedor por ID', () => {
  return app.db('devs')
    .insert({
      nome: 'Leo atualizar', sexo: 'M', idade: '22', hobby: 'Audio', datanascimento: '1998-10-03',
    }, ['id'])
    .then((devs) => request(app).delete(`/developers/${devs[0].id}1`)
      .send({ nome: 'Leo atualizado' }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nao existe Desenvolvedor cadastrado com o ID informado');
    });
});

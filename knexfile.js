require('dotenv').config();

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'db',
      user: 'postgres',
      password: '123456',
      database: 'teste',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};

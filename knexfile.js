module.exports = {
  test: {
    client: 'pg',
    version: '13.2',
    connection: {
      host: 'db',
      user: 'postgres',
      password: '123456',
      database: 'developers',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};

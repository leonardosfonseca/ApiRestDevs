module.exports = (app) => {
  app.route('/developers')
    .get(app.routes.devs.findAll)
    .post(app.routes.devs.create);

  app.route('/developers/:id')
    .get(app.routes.devs.findByID)
    .put(app.routes.devs.update)
    .delete(app.routes.devs.remove);
};

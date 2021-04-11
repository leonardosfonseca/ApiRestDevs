module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.dev.findAll(req.query)
      .then((result) => res.status(200).json(result));
  };

  const create = async (req, res) => {
    const result = await app.services.dev.save(req.body);
    if (result.error) return res.status(400).json(result);
    return res.status(201).json(result[0]);
  };

  const findByID = (req, res) => {
    app.services.dev.find({ id: req.params.id })
      .then((result) => {
        if (result.error) return res.status(404).json(result);
        return res.status(200).json(result);
      });
  };

  const update = (req, res) => {
    app.services.dev.update(req.params.id, req.body)
      .then((result) => {
        if (result.error) return res.status(400).json(result);
        return res.status(200).json(result[0]);
      });
  };

  const remove = (req, res) => {
    app.services.dev.remove(req.params.id)
      .then((result) => {
        if (result.error) return res.status(400).json(result);
        return res.status(204).json(result[0]);
      });
  };

  return {
    findAll, create, findByID, update, remove,
  };
};

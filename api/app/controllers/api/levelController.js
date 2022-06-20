const levelDataMapper = require('../../models/levelDatamapper');

const levelController = {
  async getAll(_, res) {
    const levels = await levelDataMapper.getAll();
    if (levels.length === 0) {
      return res.status(404).json({ error: 'No level found' });
    }
    return res.status(200).json(levels);
  },

  async getById(req, res) {
    const level = await levelDataMapper.getById(req.params.id);
    if (!level) {
      return res.status(404).json({ error: 'No level found' });
    }
    return res.status(200).json(level);
  },
};

module.exports = levelController;

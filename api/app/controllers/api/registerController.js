const registerDatamapper = require('../../models/registerDatamapper');

const registerController = {
  async createRegister(req, res) {
    const data = req.body;
    const register = await registerDatamapper.createRegister(data);
    return res.status(200).json(register);
  },

  async getOneRegister(req, res) {
    const { id } = req.params;
    const register = await registerDatamapper.getOneRegister(id);
    if (!register) {
      return res.status(404).json({ message: 'Register not found' });
    }
    return res.status(200).json(register);
  },

  async updateRegister(req, res) {
    const data = req.body;
    const { id } = req.params;
    const register = await registerDatamapper.updateRegister(data, id);
    return res.status(200).json(register);
  },

  async removeRegister(req, res) {
    const { id } = req.params;
    const register = await registerDatamapper.removeRegister(id);
    return res.status(200).json(register);
  },
};

module.exports = registerController;

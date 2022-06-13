const registerDatamapper = require('../../models/registerDatamapper');

const registerController = {
    async createRegister(req, res) {
        const data = req.body;
        const register = await registerDatamapper.createRegister(data);
        res.json(register);
    },

    async getOneRegister(req, res) {
        const { id } = req.params;
        const register = await registerDatamapper.getOneRegister(id);
        res.json(register);
    },

    async updateRegister(req, res) {
        const data = req.body;
        const { id } = req.params;
        const register = await registerDatamapper.updateRegister(data, id);
        res.json(register);
    },

    async removeRegister(req, res) {
        const { id } = req.params;
        const register = await registerDatamapper.removeRegister(id);
        res.json(register);
    },

};

module.exports = registerController;

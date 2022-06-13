const categoryDataMapper = require('../../models/categoryDatamapper');

const categoryController = {

    async getAll(_, res) {
        const categories = await categoryDataMapper.getAll();
        return res.json(categories);
    },

    async createCategory(req, res) {
        const categories = await categoryDataMapper.createCategory(req.body);
        return res.json(categories);
    },

    async getOneCategory(req, res) {
        const categories = await categoryDataMapper.getOneCategory(req.params.id);
        return res.json(categories);
    },

    async updateCategory(req, res) {
        const categories = await categoryDataMapper.updateCategory(req.params.id, req.body);
        return res.json(categories);
    },

    async removeCategory(req, res) {
        const activities = await categoryDataMapper.removeCategory(req.params.id);
        return res.json(activities);
    },

};

module.exports = categoryController;

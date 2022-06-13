const commentDataMapper = require('../../models/categoryDatamapper');

const commentController = {

    async getByUser(req, res) {
        const comments = await commentDataMapper.getByUser(req.params.id);
        return res.json(comments);
    },

    async getByActivity(req, res) {
        const comments = await commentDataMapper.getByActivity(req.params.id);
        return res.json(comments);
    },

    async createComment(req, res) {
        const comments = await commentDataMapper.createComment(req.body);
        return res.json(comments);
    },

    async getOneComment(req, res) {
        const comments = await commentDataMapper.getOneComment(req.params.id);
        return res.json(comments);
    },

    async updateComment(req, res) {
        const comments = await commentDataMapper.updateComment(req.params.id, req.body);
        return res.json(comments);
    },

    async removeComment(req, res) {
        const comments = await commentDataMapper.removeComment(req.params.id);
        return res.json(comments);
    },

};

module.exports = commentController;

const commentDataMapper = require('../../models/commentDatamapper');

const commentController = {

    async getByUser(req, res) {
        const comments = await commentDataMapper.getByUser(req.params.id);
        if (comments.length === 0) {
            return res.status(404).json({
                message: 'No comments found',
            });
        }
        return res.status(200).json(comments);
    },

    async getByActivity(req, res) {
        const comments = await commentDataMapper.getByActivity(req.params.id);
        if (comments.length === 0) {
            return res.status(404).json({
                message: 'No comments found',
            });
        }
        return res.status(200).json(comments);
    },

    async createComment(req, res) {
        const comments = await commentDataMapper.createComment(req.body);
        return res.status(200).json(comments);
    },

    async getOneComment(req, res) {
        const comments = await commentDataMapper.getOneComment(req.params.id);
        if (!comments) {
            return res.status(404).json({
                message: 'No comments found',
            });
        }
        return res.status(200).json(comments);
    },

    async updateComment(req, res) {
        const comments = await commentDataMapper.updateComment(req.params.id, req.body);
        if (!comments) {
            return res.status(404).json({
                message: 'No comments found',
            });
        }
        return res.status(200).json(comments);
    },

    async removeComment(req, res) {
        const comments = await commentDataMapper.removeComment(req.params.id);
        return res.json(comments);
    },

};

module.exports = commentController;

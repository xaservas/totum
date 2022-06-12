const activityDataMapper = require('../../models/activityDatamapper');

const activityController = {
    async getAll(_, res) {
        const activities = await activityDataMapper.getAll();
        return res.json(activities);
    },

    async getByCategory(req, res) {
        const activities = await activityDataMapper.getByCategory(req.params.category);
        if (!activities) {
            return res.status(404).json({ message: 'No activities found' });
        }
        return res.json(activities);
    },

    async getByGeo(req, res) {
        const activities = await activityDataMapper.getByGeo(req.params.geo);
        return res.json(activities);
    },

    async getBySearch(req, res) {
        const activities = await activityDataMapper.getBySearch(req.params.search);
        return res.json(activities);
    },

    async getOneActivity(req, res) {
        const activities = await activityDataMapper.getOneActivity(req.params.id);
        return res.json(activities);
    },

    async createActivity(req, res) {
        const activities = await activityDataMapper.createActivity(req.body);
        return res.json(activities);
    },

    async updateActivity(req, res) {
        const activities = await activityDataMapper.updateActivity(req.params.id, req.body);
        return res.json(activities);
    },

    async removeActivity(req, res) {
        const activities = await activityDataMapper.removeActivity(req.params.id);
        return res.json(activities);
    },

    async getUser(req, res) {
        const activities = await activityDataMapper.getUser(req.params.id);
        return res.json(activities);
    },

};

module.exports = activityController;

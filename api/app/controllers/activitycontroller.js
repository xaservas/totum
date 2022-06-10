const { getByGeo, getBySearch, getOneActivity, createActivity, removeActivity, updateActivity } = require('../models/dataMapper');
const activityDataMapper = require('../models/dataMapper')


activityController = {
    async getAll(_, res) {
        const activities = await activityDataMapper.getAll();
        return res.json(activities);
    },

    async getByCategory(req, res) {
        const activities= await activityDataMapper.getByCategory(req.params.id);
        return res.json(activities);
    },

    async getByGeo(req, res) {
        const activities= await activityDataMapper.getByGeo(req.params.id);
        return res.json(activities);
    },

    async getBySearch(req, res) {
        const activities= await activityDataMapper.getBySearch(req.params.id);
        return res.json(activities);
    },

    async getOneActivity(req, res) {
        const activities= await activityDataMapper.getOneActivity(req.params.id);
        return res.json(activities)
    },


    async createActivity (req, res) {
        const activities = await activityDataMapper.insert(req.body);
        return res.json(activities);

    },

    async updateActivity () {

        const activities = await activityDataMapper.updateActivity(req.params.id, req.body);
        return res.json(activities);

    },

    async removeActivity () {
        await activityDataMapper.removeActivity(req.params.id);
        return res.json();
    }



}


module.exports = activityController

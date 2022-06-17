const activityDataMapper = require('../../models/activityDatamapper');

const activityController = {
  async getAll(_, res) {
    const activities = await activityDataMapper.getAll();
    if (activities.length === 0) {
      res.status(404).json({ error: 'No activities found' });
    }
    res.status(200).json(activities);
  },

  async getByCategory(req, res) {
    const activities = await activityDataMapper.getByCategory(
      req.params.category
    );
    if (activities.length === 0) {
      res.status(404).json({ message: 'No activities found' });
    }
    res.status(200).json(activities);
  },

  async getByGeo(req, res) {
    const activities = await activityDataMapper.getByGeo(req.params.geo);
    if (activities.length === 0) {
      res.status(404).json({ message: 'No activities found' });
    }
    res.status(200).json(activities);
  },

  async getBySearch(req, res) {
    const activities = await activityDataMapper.getBySearch(req.params.search);
    if (activities.length === 0) {
      res.status(404).json({ message: 'No activities found' });
    }
    res.status(200).json(activities);
  },

  async getOneActivity(req, res) {
    const activities = await activityDataMapper.getOneActivity(req.params.id);
    if (!activities) {
      res.status(404).json({ message: 'No activities found' });
    } else {
      res.status(200).json(activities);
    }
  },

  async createActivity(req, res) {
    const activities = await activityDataMapper.createActivity(req.body);
    if (!activities) {
      res.status(500).json({ message: 'server error' });
    } else {
      res.status(200).json(activities);
    }
  },

  async updateActivity(req, res) {
    const activities = await activityDataMapper.updateActivity(
      req.params.id,
      req.body
    );
    if (!activities) {
      res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activities);
  },

  async removeActivity(req, res) {
    const activities = await activityDataMapper.removeActivity(req.params.id);
    return res.json(activities);
  },

  async getUser(req, res) {
    const activities = await activityDataMapper.getUser(req.params.id);
    if (!activities) {
      res.status(404).json({ message: 'No activities found' });
    }
    res.status(200).json(activities);
  },
};

module.exports = activityController;

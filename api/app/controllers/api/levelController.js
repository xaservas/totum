const levelDataMapper = require('../../models/levelDatamapper');

const levelController = {
    async getAll(_, res) {
        const levels = await levelDataMapper.getAll();
        if (levels.length === 0) {
            res.status(404).json({ error: 'No level found' });
        }
        res.status(200).json(levels);
    },
};

module.exports = levelController;

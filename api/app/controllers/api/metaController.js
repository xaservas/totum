const metaDatamapper = require('../../models/metaDatamapper');

const metaController = {
    async getByUser(req, res) {
        const { id } = req.params;
        const meta = await metaDatamapper.getByUser(id);
        if (meta) {
            res.status(200).json(meta);
        } else {
            res.status(404).json({ message: 'Meta not found' });
        }
    },

    async updateByUser(req, res) {
        const { id } = req.params;
        const meta = req.body;
        const updatedMeta = await metaDatamapper.updateByUser(id, meta);
        if (updatedMeta) {
            res.status(200).json(updatedMeta);
        } else {
            res.status(404).json({ message: 'Meta not found' });
        }
    },
};

module.exports = metaController;

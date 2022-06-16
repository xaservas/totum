const client = require('../config/client');

const levelDataMapper = {
    async getAll() {
        const query = {
            text: 'SELECT * FROM level',
            values: [],
        };
        const result = await client.query(query);
        return result.rows;
    },
};

module.exports = levelDataMapper;

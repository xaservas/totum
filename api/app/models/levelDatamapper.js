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

  async getById(id) {
    const query = {
      text: 'SELECT * FROM level WHERE id = $1',
      values: [id],
    };
    const result = await client.query(query);
    return result.rows[0];
  },
};

module.exports = levelDataMapper;

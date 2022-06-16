const client = require('../config/client');

const metaDatamapper = {
    async getByUser(id) {
        const query = {
            text: `
                    SELECT *
                    FROM meta
                    WHERE id_user = $1
                `,
            values: [id],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async updateByUser(id, meta) {
        const query = {
            text: `
                    UPDATE meta
                    SET
                    cookie = $1,
                    landmark = $2,
                    updated_at = NOW()
                    WHERE id_user = $3
                    RETURNING *
                `,
            values: [meta.cookie, meta.landmark, id],
        };
        const result = await client.query(query);
        return result.rows[0];
    },
};

module.exports = metaDatamapper;

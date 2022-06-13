const client = require('./client');

const commentDatamapper ={

    async getOneComment(idComment) {
        const query = {
            text: 'SELECT * FROM comment WHERE id = $1',
            values: [idComment],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            throw new Error('Comment not found');
        }
        return result.rows[0];
    },

    async getByActivity(idActivity) {
        const query = {
            text: `
                    SELECT *
                    FROM activity
                    WHERE name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%'
            `,
            values: [idActivity],
        };
        const result = await client.query(query);
        if (result.rows.length === 0) {
            return 'No results found';
        }
        return result.rows;
    },

    async getByUser(idActivity) {
        const query = {
            text: `
                    SELECT *
                    FROM activity
                    WHERE name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%'
            `,
            values: [idActivity],
        };
        const result = await client.query(query);
        if (result.rows.length === 0) {
            return 'No results found';
        }
        return result.rows;
    },

    async createComment(data) {
        const query = {
            text: `INSERT INTO comment
            (
                content,
                picture,
                id_user,
                id_activity,
                )
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
            values: [
                data.content,
                data.picture,
                data.id_user,
                data.id_activity,
            ],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async updateComment(id, data) {
        const query = {
            text: `UPDATE comment
            SET
            content = $1,
            picture = $2,
            id_user = $3,
            id_activity = $4,
            WHERE id = $5
            RETURNING *`,
            values: [
                data.content,
                data.picture,
                data.id_user,
                data.id_activity,
                id,
            ],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            throw new Error('Comment not found');
        }
        return result.rows[0];
    },

    async removeComment(id) {
        const query = {
            text: 'DELETE FROM comment WHERE id = $1 RETURNING *',
            values: [id],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            throw new Error('Comment not found');
        }
        return result.rows[0];
    },



};

module.exports = commentDatamapper

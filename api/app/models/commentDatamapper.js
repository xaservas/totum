const client = require('../config/client');

const commentDatamapper = {
    async getByUser(idUser) {
        const query = {
            text: `
                    SELECT
                        comment.id AS comment_id,
                        comment.content AS comment_content,
                        comment.created_at AS comment_date,
                        comment.id_user AS id_user,
                        users.email AS user_email,
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        activity.id AS activity_id,
                        activity.name AS activity_name
                    FROM comment
                    JOIN users ON comment.id_user = users.id
                    JOIN activity ON comment.id_activity = activity.id
                    WHERE comment.id_user = $1
            `,
            values: [idUser],
        };
        const result = await client.query(query);
        return result.rows;
    },

    async getByActivity(idActivity) {
        const query = {
            text: `
                    SELECT
                        comment.id AS comment_id,
                        comment.content AS comment_content,
                        comment.created_at AS comment_date,
                        comment.id_user AS id_user,
                        users.email AS user_email,
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        activity.id AS activity_id,
                        activity.name AS activity_name
                    FROM comment
                    JOIN users ON comment.id_user = users.id
                    JOIN activity ON comment.id_activity = activity.id
                    WHERE comment.id_activity = $1
            `,
            values: [idActivity],
        };
        const result = await client.query(query);
        return result.rows;
    },

    async createComment(data) {
        const query = {
            text: `INSERT INTO comment
            (
                content,
                picture,
                id_user,
                id_activity
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

    async getOneComment(idComment) {
        const query = {
            text: 'SELECT * FROM comment WHERE id = $1',
            values: [idComment],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            return undefined;
        }
        return result.rows[0];
    },

    async updateComment(id, data) {
        const query = {
            text: `
            UPDATE comment
            SET
            content = $1,
            picture = $2,
            updated_at = NOW()
            WHERE id = $3
            RETURNING *`,
            values: [data.content, data.picture, id],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            return undefined;
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

module.exports = commentDatamapper;

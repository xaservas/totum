const client = require('../config/client');

const register = {
    async createRegister(data) {
        const check = {
            text: `
            SELECT *
            FROM user_activity
            WHERE id_user = $1 AND id_activity = $2
            `,
            values: [data.id_user, data.id_activity],
        };
        const checkResult = await client.query(check);
        if (checkResult.rows.length > 0) {
            throw new Error('User already registered for this activity');
        }
        const query = {
            text: `
            INSERT INTO user_activity (
                id_user,
                id_activity
            ) VALUES (
                $1,
                $2
            )
            RETURNING *`,
            values: [data.id_user, data.id_activity],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getOneRegister(id) {
        const query = {
            text: `
            SELECT
                user_activity.id_user AS id_user,
                user_activity.id_activity AS id_activity,
                activity.name AS activity_name,
                activity.description AS activity_description,
                activity.date AS activity_date,
                category.name AS category_name,
                users.firstname AS user_firstname,
                users.lastname AS user_lastname,
                users.email AS user_email
            FROM user_activity
            JOIN activity ON user_activity.id_activity = activity.id
            JOIN category ON activity.id_category = category.id
            JOIN users ON user_activity.id_user = users.id
            WHERE user_activity.id = $1`,
            values: [id],
        };
        const result = await client.query(query);
        if (result.rows.length === 0) {
            return undefined;
        }
        return result.rows[0];
    },

    async updateRegister(data, id) {
        const check = {
            text: `
            SELECT *
            FROM user_activity
            WHERE id_user = $1 AND id_activity = $2
            `,
            values: [data.id_user, data.id_activity],
        };
        const checkResult = await client.query(check);
        if (checkResult.rows.length > 0) {
            throw new Error('User as already registered for this activity');
        }
        const query = {
            text: `
            UPDATE user_activity
            SET id_user = $1,
                id_activity = $2,
                updated_at = NOW()
            WHERE id = $3
            RETURNING *`,
            values: [data.id_user, data.id_activity, id],
        };
        const result = await client.query(query);
        if (result.rows.length === 0) {
            throw new Error('Register not found');
        }
        return result.rows[0];
    },

    async removeRegister(id) {
        const query = {
            text: `
            DELETE FROM user_activity
            WHERE id = $1
            RETURNING *`,
            values: [id],
        };
        const result = await client.query(query);
        if (result.rows.length === 0) {
            throw new Error('Register not found');
        }
        return result.rows[0];
    },
};

module.exports = register;

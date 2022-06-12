const client = require('./client');

const user = {
    async getAll() {
        const query = 'SELECT * FROM users';
        const result = await client.query(query);
        return result.rows;
    },

    async login(email, password) {
        const query = {
            text: `
                    SELECT *
                    FROM users
                    WHERE email = $1
                    AND password = $2
                `,
            values: [email, password],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async createUser(data) {
        const query = {
            text: `
                    INSERT INTO users
                    (
                        email,
                        password,
                        firstname,
                        lastname,
                        picture,
                        about,
                        address,
                        city,
                        country,
                        zip_code)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    RETURNING *
                    `,
            // eslint-disable-next-line max-len
            values: [
                data.email,
                data.password,
                data.firstname,
                data.lastname,
                data.picture,
                data.about,
                data.address,
                data.city,
                data.country,
                data.zip_code,
            ],
        };
        const response = await client.query(query);

        const query2 = {
            text: `
                    INSERT INTO meta
                        (
                        cookie,
                        landmark,
                        id_user
                        )
                    VALUES ($1, $2, $3)
                    RETURNING *
                    `,
            values: [data.cookie, data.landmark, response.rows[0].id],
        };
        const response2 = await client.query(query2);

        const query3 = {
            text: `
            UPDATE users
            SET meta_id = $1
            WHERE id = $2
            RETURNING *
            `,
            // eslint-disable-next-line max-len
            values: [
                response2.rows[0].id,
                response.rows[0].id,
            ],
        };
        const response3 = await client.query(query3);

        return response3.rows[0];
    },

    async getOneUser(id) {
        const query = {
            text: `
                    SELECT *
                    FROM users
                    WHERE id = $1
                `,
            values: [id],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            throw new Error('User not found');
        }
        return result.rows[0];
    },

    async updateUser(id, data) {
        const query = {
            text: `
                    UPDATE users SET
                    password = $1,
                    firstname = $2,
                    lastname = $3,
                    picture = $4,
                    about = $5,
                    address = $6,
                    city = $7,
                    country = $8,
                    zip_code = $9
                    WHERE id = $10
                    RETURNING *
                `,
            // eslint-disable-next-line max-len
            values: [data.password, data.firstname, data.lastname, data.picture, data.about, data.address, data.city, data.country, data.zip_code, id],
        };
        const response = await client.query(query);
        const queryMeta = {
            text: `
                    UPDATE meta
                    SET cookie = $1, landmark = $2
                    WHERE id_user = $3
                `,
            values: [data.cookie, data.landmark, id],
        };
        const meta = await client.query(queryMeta);
        if (!response.rows[0]) {
            throw new Error('User not found');
        }
        return {
            response: response.rows[0],
            meta: meta.rows[0],
        };
    },

    async removeUser(id) {
        const query = {
            text: `
                    DELETE FROM users
                    WHERE id = $1
                    RETURNING *
                `,
            values: [id],
        };
        const response = await client.query(query);
        const queryMeta = {
            text: `
                    DELETE FROM meta
                    WHERE id_user = $1
                    RETURNING *
                `,
            values: [id],
        };
        const meta = await client.query(queryMeta);
        if (!response.rows[0]) {
            throw new Error('User not found');
        }
        return {
            response: response.rows[0],
            meta: meta.rows[0],
        };
    },

    async getUserActivity(id) {
        const query = {
            text: `
                    SELECT
                        users.id AS user_id,
                        users.email AS user_email,
                        users.firstname AS user_firstname,
                        users.lastname AS user_lastname,
                        activity.name AS activity_name,
                        activity.description AS activity_description,
                        activity.date AS activity_date,
                        category.name AS category_name,
                        level.name AS level_name
                    FROM users
                    JOIN user_activity ON users.id = user_activity.id_user
                    JOIN activity ON user_activity.id_activity = activity.id
                    JOIN category ON activity.id_category = category.id
                    JOIN level ON activity.level = level.id
                    WHERE users.id = $1
                `,
            values: [id],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            throw new Error('No activity found for this user');
        }
        return result.rows;
    },

};

module.exports = user;

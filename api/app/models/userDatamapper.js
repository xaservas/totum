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

    async logout(token) {
        const query = {
            text: `
                    INSERT INTO token_blacklist (token)
                    VALUES ($1)
                `,
            values: [token],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async updatePassword(id, password) {
        const query = {
            text: `
                    UPDATE users
                    SET
                    password = $2,
                    updated_at = NOW()
                    WHERE id = $1
                    RETURNING *
                `,
            values: [id, password],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async updateEmail(id, email) {
        const query = {
            text: `
                    UPDATE users
                    SET
                    email = $2,
                    updated_at = NOW()
                    WHERE id = $1
                    RETURNING *
                `,
            values: [id, email],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async createUser(data) {
        const verification = {
            text: `
                    SELECT email FROM users WHERE email = $1
                `,
            values: [data.email],
        };
        const result = await client.query(verification);
        if (result.rows.length === 0) {
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
                values: [
                    response2.rows[0].id,
                    response.rows[0].id,
                ],
            };
            const response3 = await client.query(query3);
            return response3.rows[0];
        }
        throw new Error('Email already exists');
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
        return result.rows[0];
    },

    async updateUser(id, data) {
        const query = {
            text: `
                    UPDATE users SET
                    firstname = $1,
                    lastname = $2,
                    picture = $3,
                    about = $4,
                    address = $5,
                    city = $6,
                    country = $7,
                    zip_code = $8,
                    updated_at = NOW()
                    WHERE id = $9
                    RETURNING *
                `,

            values: [
                data.firstname,
                data.lastname,
                data.picture,
                data.about,
                data.address,
                data.city,
                data.country,
                data.zip_code,
                id,
            ],
        };
        const response = await client.query(query);
        const queryMeta = {
            text: `
                    UPDATE meta
                    SET
                    cookie = $1,
                    landmark = $2,
                    updated_at = NOW()
                    WHERE id_user = $3
                    RETURNING *
                `,
            values: [data.cookie, data.landmark, id],
        };
        const meta = await client.query(queryMeta);
        if (!response.rows[0]) {
            return undefined;
        }
        return [response.rows[0], meta.rows[0]];
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
        return result.rows;
    },

};

module.exports = user;

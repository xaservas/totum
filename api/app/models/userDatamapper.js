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
                    INSERT INTO users (email, password, firstname, lastname, picture, about, address, city, country, zip_code)
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
                    INSERT INTO meta (cookie, landmark, id_user)
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
                    UPDATE users
                    SET email = $1, password = $2, firstname = $3, lastname = $4, picture = $5, about = $6, address = $7, city = $8, country = $9, zip_code = $10
                    WHERE id = $11
                    RETURNING *
                `,
            // eslint-disable-next-line max-len
            values: [data.email, data.password, data.firstname, data.lastname, data.picture, data.about, data.address, data.city, data.country, data.zip_code, id],
        };
        const response = await client.query(query);
        const queryMeta = {
            text: `
                    UPDATE meta
                    SET cookie = $1, landmark = $2
                    WHERE user_id = $3
                `,
            values: [data.cookie, data.landmark, id],
        };
        const meta = await client.query(queryMeta);
        return {
            response,
            meta,
        };
    },

    async removeUser(id) {
        const query = {
            text: `
                    DELETE
                    FROM users AS t1 INNER JOIN meta AS t2
                    ON t1.id = t2.user_id
                    WHERE t1.id = $1
                `,
            values: [id],
        };
        await client.query(query);
    },

};

module.exports = user;

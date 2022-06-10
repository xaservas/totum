const client = require('./client');

const user = {
    getAll: () => client.query(`
            SELECT *
            FROM users
        `),

    login: (email, password) => {
        const query = {
            text: `
                    SELECT *
                    FROM users
                    WHERE email = $1
                    AND password = $2
                `,
            values: [email, password],
        };
        return client.query(query);
    },

    createUser: (data) => {
        const query = {
            text: `
                    INSERT INTO users (email, password, firstname, lastname, picture, about, address, city, country, zip_code, meta_id) RETURNING *
                    `,
            // eslint-disable-next-line max-len
            values: [data.email, data.password, data.firstname, data.lastname, data.picture, data.about, data.address, data.city, data.country, data.zip_code, data.meta_id],
        };
        const response = client.query(query);
        const queryMeta = {
            text: `
                    INSERT INTO meta (cookie, landmark, user_id)
                    VALUES ($1, $2, $3)
                    `,
            values: [data.cookie, data.landmark, response.rows[0].id],
        };
        const meta = client.query(queryMeta);
        return {
            response,
            meta,
        };
    },

    getOneUser: (id) => {
        const query = {
            text: `
                    SELECT *
                    FROM users
                    WHERE id = $1
                `,
            values: [id],
        };
        return client.query(query);
    },

    updateUser: (id, data) => {
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
        const response = client.query(query);
        const queryMeta = {
            text: `
                    UPDATE meta
                    SET cookie = $1, landmark = $2
                    WHERE user_id = $3
                `,
            values: [data.cookie, data.landmark, id],
        };
        const meta = client.query(queryMeta);
        return {
            response,
            meta,
        };
    },

    removeUser: (id) => {
        const query = {
            text: `
                    DELETE
                    FROM users AS t1 INNER JOIN meta AS t2
                    ON t1.id = t2.user_id
                    WHERE t1.id = $1
                `,
            values: [id],
        };
        return client.query(query);
    },

};

module.exports = user;

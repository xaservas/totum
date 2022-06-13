const client = require('./client');

const categoryDatamapper = {

    async getAll() {
        const query = {
            text: 'SELECT * FROM category',
            values: [],
        };
        const result = await client.query(query);
        return result.rows;
    },

    async createCategory(data) {
        const query = {
            text: `INSERT INTO category
            (
                picto,
                id_user,
            )
                VALUES ($1, $2)
                RETURNING *`,
            values: [
                data.picto,
                data.id_user,
                    ],

        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getOneCategory(idCategory) {
        const query = {
            text: 'SELECT * FROM category WHERE id = $1',
            values: [idCategory],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            throw new Error('Category not found');
        }
        return result.rows[0];
    },

    async updateCategory(id, data) {
        const query = {
            text: `UPDATE category
            SET
            picto = $1,
            id_user = $2,
            WHERE id = $3
            RETURNING *`,
            values: [
                data.picto,
                data.id_user,
                id,
            ],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            throw new Error('Category not found');
        }
        return result.rows[0];
    },

    async removeCategory(id) {
        const query = {
            text: 'DELETE FROM category WHERE id = $1 RETURNING *',
            values: [id],
        };
        const result = await client.query(query);
        if (!result.rows[0]) {
            throw new Error('Category not found');
        }
        return result.rows[0];
    },

};

module.exports = categoryDatamapper;

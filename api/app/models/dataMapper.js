const client = require('./client');

const activityDataMapper = {

    // routes GET
    async getAll () {
        const query = {
            text: 'SELECT * FROM activity',
            values: [],
        };
        const result = await client.query(query)
           return result.rows
    },

    async getByCategory (idCategory) {
        const query = {
            text: ' SELECT * FROM activity WHERE id_category = $1 ',
            values: [idCategory],
        }
        const result = await client.query(query)
        return result.rows

        },

        async getByGeo (idGeolocalisation) {
            const query = {
                text:  ' SELECT * FROM activity WHERE landmark = $1 ',
                values: [idGeolocalisation],
            }
           const result = await client.query(query)
           return result.rows

    },

    async getBySearch (idKeyWord) {
        const query = {
            text: ' SELECT * FROM activity WHERE name OR description = $1 ',
            values: [idKeyWord],
        }
        const result = await client.query(query)
           return result.rows
    },

    async getOneActivity (idActivity) {
        const query = {
            text: 'SELECT * FROM activity WHERE id = $1',
            values: [idActivity],
        };
        const result = await client.query(query)
           return result.rows
    },

    // route POST
    async createActivity (data) {
        const query = {
            text: 'INSERT INTO activity (name, level, adress, zip_code, description, city, country, landmark, id_user, id_category)  ',
            values: [data.name, data.level, data.adress, data.zip_code, data.description, data.city, data.country, data.landmark, data.id_user, data.id_category]

        };
        const result = await client.query(query)
           return result.rows
    },

    // route PATCH
    async updateActivity (id, data) {
        const query = {
            text: 'UPDATE activity SET name = $1, level = $2, adress = $3, zip_code = $4, description = $5, city = $6, country = $7, landmark = $8, id_user = $9, id_category = $10 WHERE id = $11',
            values: [data.name, data.level, data.adress, data.zip_code, data.descritpion, data.city, data.country, data.landmark, data.id_user, data.id_category, id]
        };
        const result = await client.query(query)
           return result.rows

    },

    // route DELETE
    async removeActivity (id) {
        const query = {
            text: 'DELETE FROM activity WHERE id = $1',
            values: [id],

        };
        const result = await client.query(query)
           return result.rows
    },

};

module.exports = activityDataMapper

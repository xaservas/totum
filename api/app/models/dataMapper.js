const client = require('./client');

const activity = {
    getAll: () => {
        const query = {
            text: 'SELECT * FROM users',
            values: [],
        };
        return client.query(query);
    },

    
};


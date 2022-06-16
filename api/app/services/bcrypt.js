const bcrypt = require('bcrypt');

const saltRounds = 10;

const passwordHash = {
    hash: async (password) => {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },

    compare: async (password, hash) => {
        const result = await bcrypt.compare(password, hash);
        return result;
    },

};

module.exports = passwordHash;

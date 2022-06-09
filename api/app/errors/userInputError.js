/**
 * @typedef {object} UserInputError
 * @property {string} message - Error message
 * @property {object} infos - Additional error informations
 */
class UserInputError extends Error {
    constructor(message, infos) {
        super(message);
        this.name = 'UserInputError';
        this.infos = infos;
    }
}

module.exports = UserInputError;

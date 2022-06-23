const Joi = require('joi');

const textRule = Joi.string().pattern(/^[a-zA-ZÀ-ÿ0-9 ']+$/);

module.exports = Joi.object({
    search: textRule.required(),
});

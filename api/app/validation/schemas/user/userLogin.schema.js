const Joi = require('joi');

const textRule = Joi.string().min(2).pattern(/^[a-zA-ZÀ-ÿ0-9 ']+$/).required();
const emailRule = Joi.string().email().required();

module.exports = Joi.object({
    email: emailRule,
    password: textRule,
});

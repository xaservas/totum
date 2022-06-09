const Joi = require('joi');

const textRule = Joi.string().min(2).pattern(/^[a-zA-ZÀ-ÿ0-9 ']+$/);
const numberRule = Joi.number().min(0);
const emailRule = Joi.string().email();

module.exports = Joi.object({
    email: emailRule,
    password: textRule,
    firstName: textRule,
    lastName: textRule,
    picture: textRule,
    about: textRule,
    address: textRule,
    zip_code: numberRule,
    city: textRule,
    country: textRule,
    meta_id: numberRule,
});

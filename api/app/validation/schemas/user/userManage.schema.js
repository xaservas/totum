const Joi = require('joi');

const textRule = Joi.string().min(2).pattern(/^[a-zA-ZÀ-ÿ0-9 ']+$/);
const numberRule = Joi.number().min(0);
const emailRule = Joi.string().email();
const meta = Joi.boolean();

module.exports = Joi.object({
    email: emailRule,
    emailNew: emailRule,
    emailConfirmation: emailRule,
    password: textRule,
    passwordConfirmation: textRule,
    firstname: textRule,
    lastname: textRule,
    picture: textRule,
    about: textRule,
    address: textRule,
    zip_code: numberRule,
    city: textRule,
    country: textRule,
    meta_id: numberRule,
    cookie: meta,
    landmark: meta,
});

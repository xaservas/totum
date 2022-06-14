const Joi = require('joi');

const textRule = Joi.string().min(2).pattern(/^[a-zA-ZÀ-ÿ0-9 ']+$/);
const numberRule = Joi.number().min(0);
const pictoRule = Joi.string().min(2);

module.exports = Joi.object({
    id: numberRule,
    name: textRule.required(),
    picto: pictoRule,
    id_user: numberRule,
});

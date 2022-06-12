const Joi = require('joi');

const textRule = Joi.string().min(2).pattern(/^[a-zA-ZÀ-ÿ0-9 ']+$/);
const numberRule = Joi.number().min(0);

module.exports = Joi.object({
    id: numberRule,
    content: textRule,
    picture: textRule,
    id_user: numberRule,
    id_activity: numberRule,
});

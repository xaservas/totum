const Joi = require('joi');

const textRule = Joi.string().min(2).required();
const numberRule = Joi.number().min(0).required();

module.exports = Joi.object({
    name: textRule,
    description: textRule,
    max_participants: numberRule,
    date: textRule,
    level: numberRule,
    address: textRule,
    zip_code: textRule,
    city: textRule,
    country: textRule,
    landmark: textRule,
    id_user: numberRule,
    id_category: numberRule,
});

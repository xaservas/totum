const Joi = require('joi');

const numberRule = Joi.number().min(0);

module.exports = Joi.object({
    category: numberRule,
});

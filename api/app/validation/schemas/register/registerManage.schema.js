const Joi = require('joi');

const numberRule = Joi.number().min(0);

module.exports = Joi.object().keys({
    id_user: numberRule.required(),
    id_activity: numberRule.required(),
});

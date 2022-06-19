const Joi = require('joi');

const numberRule = Joi.number().integer().min(0).required();

module.exports = Joi.object({
  id: numberRule,
});

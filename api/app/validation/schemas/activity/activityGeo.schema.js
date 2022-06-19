const Joi = require('joi');

const textRule = Joi.string().min(2).required();

module.exports = Joi.object({
  geo: textRule,
});

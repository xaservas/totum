const Joi = require('joi');

const textRule = Joi.string().required();

module.exports = Joi.object({
  id_category: textRule,
  city: textRule,
  level: textRule,
});

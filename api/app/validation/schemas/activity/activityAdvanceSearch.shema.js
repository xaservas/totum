const Joi = require('joi');

const textRule = Joi.string()
  .pattern(/^[a-zA-ZÀ-ÿ0-9 ']+$/)
  .required();

module.exports = Joi.object({
  id_category: textRule,
  city: textRule,
  level: textRule,
});

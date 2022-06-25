const Joi = require('joi');

const mailRules = Joi.string().email().required();

module.exports = Joi.object({
  mail: mailRules,
});

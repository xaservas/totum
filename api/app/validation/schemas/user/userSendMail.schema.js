const Joi = require('joi');

const mailRules = Joi.string().email().required();
const textRules = Joi.string().required();
const tokenRules = Joi.string().required();

module.exports = Joi.object({
  email: mailRules,
  message: textRules,
  token: tokenRules,
});

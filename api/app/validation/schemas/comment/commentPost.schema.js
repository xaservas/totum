const Joi = require('joi');

const textRule = Joi.string().min(2);
const numberRule = Joi.number().min(0);

module.exports = Joi.object({
  id: numberRule,
  content: textRule.required(),
  picture: textRule,
  id_user: numberRule.required(),
  id_activity: numberRule.required(),
});

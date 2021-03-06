const Joi = require('joi');

const textRule = Joi.string().min(2);
const numberRule = Joi.number().min(0);
const emailRule = Joi.string().email().required();
const meta = Joi.boolean();

module.exports = Joi.object({
  email: emailRule,
  password: textRule.required(),
  passwordConfirmation: textRule.required(),
  firstname: textRule.required(),
  lastname: textRule.required(),
  picture: textRule,
  about: textRule.empty(''),
  address: textRule.required(),
  zip_code: numberRule.required(),
  city: textRule.required(),
  country: textRule.required(),
  meta_id: numberRule,
  coordinate: textRule,
  cookie: meta,
  landmark: meta,
});

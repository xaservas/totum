const Joi = require('joi');

const textRule = Joi.string().min(2).required();
const numberRule = Joi.number().min(0);
const pictoRule = Joi.string().min(2);

module.exports = Joi.object({
  id: numberRule,
  name: textRule,
  picto: pictoRule,
  id_user: numberRule,
});

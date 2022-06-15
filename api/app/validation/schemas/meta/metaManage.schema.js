const Joi = require('joi');

const booleanRule = Joi.boolean().required();

module.exports = Joi.object({
    cookie: booleanRule,
    landmark: booleanRule,
});

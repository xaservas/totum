const UserInputError = require('../errors/userInputError');
/**
 * Middleware factory for Joi validation
 * @param {string} sourceData - possible values [query | body | params]
 * @param {Object} schema - Joi object schema
 * @returns middleware function
 */

function validator(sourceData, schema) {
  // validator n'est pas un middleware mais une factory de middleware, c'est une fonction qui va
  // renvoyer une autre function qui elle sera une fonction de middleware
  return async (req, res, next) => {
    try {
      console.log(req[sourceData]);
      // request.query ou request.body ou request.params
      await schema.validateAsync(req[sourceData]);
      next();
    } catch (err) {
      const userInputError = new UserInputError(err.details[0].message, {
        statusCode: 400,
      });
      next(userInputError);
    }
  };
}

module.exports = validator;

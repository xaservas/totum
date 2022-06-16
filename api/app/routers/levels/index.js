const express = require('express');

const router = express.Router();
const commentController = require('../../controllers/api/commentController');

// Require validator and schemas Joi
const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');


// Require controllers try catch
const controllerHandler = require('../../helpers/controllerHandler');

//  Require error handler
const errorHandler = require('../../helpers/errorHandler');

// Require services token
const jwt = require('../../services/token');
const levelController = require('../../controllers/levelController');

router.route('/getAll')

/**
        * GET /v1/level/levels
        * @summary See all levels
        * @tags Level
        * @return {object} 200 - Level object
        * @return {object}  500 - Error
        * @example response - 200 - success response example
        * [
        * {
        * "id": 1,
        * ]
        *  @example response - 500 - error response example
       * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */

    .get(
        validator('query'),
        controllerHandler(levelController.getAll),
    );

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

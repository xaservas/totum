const express = require('express');

const router = express.Router();
const metaController = require('../../controllers/api/metaController');

const apiErrorController = require('../../controllers/api/error');

// Require validator and schemas Joi
const validator = require('../../validation/validator');
const metaGetSchema = require('../../validation/schemas/meta/metaGet.schema');
const metaManageSchema = require('../../validation/schemas/meta/metaManage.schema');

// Require controllers try catch
const controllerHandler = require('../../helpers/controllerHandler');

//  Require error handler
const errorHandler = require('../../helpers/errorHandler');

// Require services token
const jwt = require('../../services/token');

router.route('/:id/manage')

/**
 * GET /v1/meta/{id}/manage
 * @summary Get meta data for user
 * @tags meta
 * @security BearerAuth
 * @param {number} id.path.required - User id
 * @returns {object} 200 - Meta data
 * @returns {object} 400 - Invalid request
 * @example response - 200 - success response example
 * {
 * "id": 1,
 * "cookie": "boolean",
 * "landmark": "boolean",
 * "id_user": 1,
 * "created_at": "2020-01-01T00:00:00.000Z",
 * "updated_at": "2020-01-01T00:00:00.000Z"
 * }
 * @example response - 400 - error response example
 * {
 * "error": "Invalid request"
 * }
 */
    .get(
        controllerHandler(jwt.verifyToken),
        validator('params', metaGetSchema),
        controllerHandler(metaController.getByUser),
    )

    /**
     * PATCH /v1/meta/{id}/manage
     * @summary Update meta data for user
     * @tags meta
     * @security BearerAuth
     * @param {number} id.path.required - User id
     * @param {object} request.body.required - Meta data
     * @returns {object} 200 - Meta data
     * @returns {object} 400 - Invalid request
     * @example request - Meta data
     * {
     * "cookie": "boolean",
     * "landmark": "boolean"
     * }
     * @example response - 200 - success response example
     * {
     * "id": 1,
     * "cookie": "boolean",
     * "landmark": "boolean",
     * "id_user": 1,
     * "created_at": "2020-01-01T00:00:00.000Z",
     * "updated_at": "2020-01-01T00:00:00.000Z"
     * }
     * @example response - 400 - error response example
     * {
     * "error": "Invalid request"
     * }
     */
    .patch(
        controllerHandler(jwt.verifyToken),
        validator('params', metaGetSchema),
        validator('body', metaManageSchema),
        controllerHandler(metaController.updateByUser),
    );

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

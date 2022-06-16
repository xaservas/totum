const express = require('express');

const router = express.Router();
const levelController = require('../../../controllers/api/levelController');

const apiErrorController = require('../../../controllers/api/error');

// Require controllers try catch
const controllerHandler = require('../../../helpers/controllerHandler');

//  Require error handler
const errorHandler = require('../../../helpers/errorHandler');

router
    .route('/getAll')

    /**
     * GET /v1/level/getAll
     * @summary See all levels
     * @tags Level
     * @return {object} 200 - Level object
     * @return {object}  404 - Error
     * @example response - 200 - success response example
     * [
     * {
     * "id": 1,
     * "name": "string",
     * "created_at": "2020-01-01T00:00:00.000Z",
     * "updated_at": "2020-01-01T00:00:00.000Z"
     * }
     * ]
     *  @example response - 404 - error response example
     * {
     * "error": "No level found"
     * }
     */

    .get(controllerHandler(levelController.getAll));

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

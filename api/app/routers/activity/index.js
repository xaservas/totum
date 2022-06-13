const express = require('express');

const router = express.Router();
const activityController = require('../../controllers/api/activityController');

const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');

const activityPostSchema = require('../../validation/schemas/activity/activityPost.schema');
const activityManageSchema = require('../../validation/schemas/activity/activityManage.schema');
const activityGetSchema = require('../../validation/schemas/activity/activityGet.schema');

const controllerHandler = require('../../helpers/controllerHandler');
const errorHandler = require('../../helpers/errorHandler');
const jwt = require('../../services/token');

router.route('/createNew')
    /**
     * POST /v1/activity/createNew
     * @summary Create a new activity
     * @tags Activity
     * @security BearerAuth
     * @param {object} request.body.required - Activity data
     * @return {object} 200 - Activity object
     * @return {object}  500 - Error
     * @example request - Activity data
     * {
     * "name": "String",
     * "description": "String",
     * "max_participants": "Number Integer",
     * "date": "String",
     * "level": "Number Integer",
     * "address": "String",
     * "zip_code": "String",
     * "city": "String",
     * "country": "String",
     * "landmark": "String",
     * "id_user": "Number Integer",
     * "id_category": "Number Integer"
     * }
     * @example response - 200 - success response example
     * {
     * "id": 1,
     * "description": "String",
     * "max_participants": "Number Integer",
     * "date": "String",
     * "level": "Number Integer",
     * "address": "String",
     * "zip_code": "String",
     * "city": "String",
     * "country": "String",
     * "landmark": "String",
     * "id_user": "Number Integer",
     * "id_category": "Number Integer",
     * "created_at": "2020-05-05T14:00:00.000Z",
     * "updated_at": "2020-05-05T14:00:00.000Z"
     * }
     * @example response - 500 - error response example
     * {
     * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
     * }
     */
    .post(
        controllerHandler(jwt.verifyToken),
        validator('body', activityPostSchema),
        controllerHandler(activityController.createActivity),
    );

router.route('/:id/manage')
    .get(
        validator('query', activityGetSchema),
        controllerHandler(activityController.getOneActivity),
    )
    .patch(
        controllerHandler(jwt.verifyToken),
        validator('body', activityManageSchema),
        controllerHandler(activityController.updateActivity),
    )
    .delete(
        controllerHandler(jwt.verifyToken),
        validator('query', activityManageSchema),
        controllerHandler(activityController.removeActivity),
    );

router.route('/:id/user')
    .get(
        validator('query', activityGetSchema),
        controllerHandler(activityController.getUser),
    );

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

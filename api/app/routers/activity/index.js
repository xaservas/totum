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

router.route('/createNew')
    .post(
        validator('body', activityPostSchema),
        controllerHandler(activityController.createActivity),
    );

router.route('/:id/manage')
    .get(
        validator('query', activityGetSchema),
        controllerHandler(activityController.getOneActivity),
    )
    .patch(
        validator('body', activityManageSchema),
        controllerHandler(activityController.updateActivity),
    )
    .delete(
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

// /**
//      * GET /api/cadex
//      * @summary To get a random cadex and personalize it
//      * @param {string} noun.query - cadex personalized noun
//      * @param {string} adjective.query - cadex personalized adjective
//      * @param {string} verb.query - cadex personalized verb
//      * @param {string} complement.query - cadex personalized complement
//      * @return {cadex} 200 - success response
//      * @return {error} 400 - input data invalid
//      */

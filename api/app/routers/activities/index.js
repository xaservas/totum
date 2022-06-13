const express = require('express');

const router = express.Router();
const activityController = require('../../controllers/api/activityController');

const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');

const activityGeoSchema = require('../../validation/schemas/activity/activityGeo.schema');
const activitySearchSchema = require('../../validation/schemas/activity/activitySearch.schema');
const activityCategorySchema = require('../../validation/schemas/activity/activityCategory.schema');

const controllerHandler = require('../../helpers/controllerHandler');
const errorHandler = require('../../helpers/errorHandler');

router.route('/')
    /**
        * GET /v1/activities/
        * @summary Get all activities
        * @tags Activities
        * @return {object} 200 - User object
        * @return {object}  500 - Error
        * @example response - 200 - success response example
        * {
        * "id": 1,
        * "email": "test@test.com",
        * "password": "hash",
        * "firstname": "firstname",
        * "lastname": "lastname",
        * "picture": "asset link to picture",
        * "about": "presentation about user",
        * "address": "address",
        * "zip_code": "zip_code",
        * "city": "city",
        * "country": "country",
        * "created_at": "2020-05-05T14:00:00.000Z",
        * "updated_at": "2020-05-05T14:00:00.000Z",
        * "meta_id": 1
        * }
        *  @example response - 500 - error response example
        * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */
    .get(
        controllerHandler(activityController.getAll),
    );

router.route('/:category/category')
    .get(
        validator('query', activityCategorySchema),
        controllerHandler(activityController.getByCategory),
    );

router.route('/:geo/geo')
    .get(
        validator('query', activityGeoSchema),
        controllerHandler(activityController.getByGeo),
    );

router.route('/:search/search')
    .get(
        validator('params', activitySearchSchema),
        controllerHandler(activityController.getBySearch),
    );

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

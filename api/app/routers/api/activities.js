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

router
  .route('/')
  /**
   * GET /v1/activities/
   * @summary Get all activities
   * @tags Activities
   * @return {object} 200 - Activities object
   * @return {object}  500 - Error
   * @return {object}  400 - Error
   * @example response - 200 - success response example
   * [
   * {
   *  "id": 1,
   * "name": "name",
   * "description": "description",
   * "max_participants": 1,
   * "date": "2020-05-05T14:00:00.000Z",
   * "level": 1,
   * "address": "address",
   * "zip_code": "zip_code",
   * "city": "city",
   * "country": "country",
   * "landmark": "[42.0, 42.0]",
   * "id_user": 1,
   * "id_category": 1,
   * "created_at": "2020-05-05T14:00:00.000Z",
   * "updated_at": "2020-05-05T14:00:00.000Z"
   * }
   * ]
   *  @example response - 500 - error response example
   * {
   * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
   * }
   * @example response - 400 - error response example
   * {
   * "error": "No activities found"
   * }
   */
  .get(controllerHandler(activityController.getAll));

router
  .route('/:category/category')
  /**
   * GET /v1/activities/{category}/category
   * @summary Get all activities by category
   * @tags Activities
   * @param {number} category.path.required - Category name
   * @return {object} 200 - Category object
   * @return {object}  500 - Error
   * @return {object}  400 - Error
   * @example response - 200 - success response example
   * [
   * {
   *  "id": 1,
   * "name": "name",
   * "description": "description",
   * "max_participants": 1,
   * "date": "2020-05-05T14:00:00.000Z",
   * "level": 1,
   * "address": "address",
   * "zip_code": "zip_code",
   * "city": "city",
   * "country": "country",
   * "landmark": "[42.0, 42.0]",
   * "id_user": 1,
   * "id_category": 1,
   * "created_at": "2020-05-05T14:00:00.000Z",
   * "updated_at": "2020-05-05T14:00:00.000Z"
   * }
   * ]
   * @example response - 500 - error response example
   * {
   * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
   * }
   * @example response - 400 - error response example
   * {
   * "error": "No activities found"
   * }
   */
  .get(
    validator('params', activityCategorySchema),
    controllerHandler(activityController.getByCategory)
  );

router
  .route('/:geo/geo')
  /**
   * GET /v1/activities/{geo}/geo
   * @summary Get all activities by geo
   * @tags Activities
   * @param {string} geo.path.required - Geo name
   * @return {object} 200 - Geo object
   * @return {object}  500 - Error
   * @return {object}  400 - Error
   * @example response - 200 - success response example
   * [
   * {
   *  "id": 1,
   * "name": "name",
   * "description": "description",
   * "max_participants": 1,
   * "date": "2020-05-05T14:00:00.000Z",
   * "level": 1,
   * "address": "address",
   * "zip_code": "zip_code",
   * "city": "city",
   * "country": "country",
   * "landmark": "[42.0, 42.0]",
   * "id_user": 1,
   * "id_category": 1,
   * "created_at": "2020-05-05T14:00:00.000Z",
   * "updated_at": "2020-05-05T14:00:00.000Z"
   * }
   * ]
   * @example response - 500 - error response example
   * {
   * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
   * }
   * @example response - 400 - error response example
   * {
   * "error": "No activities found"
   * }
   */
  .get(
    validator('params', activityGeoSchema),
    controllerHandler(activityController.getByGeo)
  );

router
  .route('/:search/search')
  /**
   * GET /v1/activities/{search}/search
   * @summary Get all activities by search
   * @tags Activities
   * @param {string} search.path.required - Search name
   * @return {object} 200 - Search object
   * @return {object}  500 - Error
   * @return {object}  400 - Error
   * @example response - 200 - success response example
   * [
   * {
   *  "id": 1,
   * "name": "name",
   * "description": "description",
   * "max_participants": 1,
   * "date": "2020-05-05T14:00:00.000Z",
   * "level": 1,
   * "address": "address",
   * "zip_code": "zip_code",
   * "city": "city",
   * "country": "country",
   * "landmark": "[42.0, 42.0]",
   * "id_user": 1,
   * "id_category": 1,
   * "created_at": "2020-05-05T14:00:00.000Z",
   * "updated_at": "2020-05-05T14:00:00.000Z"
   * }
   * ]
   * @example response - 500 - error response example
   * {
   * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
   * }
   * @example response - 400 - error response example
   * {
   * "error": "No activities found"
   * }
   */
  .get(
    validator('params', activitySearchSchema),
    controllerHandler(activityController.getBySearch)
  );

router
  .route('/advancedSearch')
  .post(controllerHandler(activityController.getByAdvanceSearch));

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

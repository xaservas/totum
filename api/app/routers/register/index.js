const express = require('express');

const router = express.Router();
const registerController = require('../../controllers/api/registerController');

// Require validator and schemas Joi
const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');
const registerGetSchema = require('../../validation/schemas/register/registerGet.schema');
const registerPostSchema = require('../../validation/schemas/register/registerManage.schema');

// Require controllers try catch
const controllerHandler = require('../../helpers/controllerHandler');

//  Require error handler
const errorHandler = require('../../helpers/errorHandler');

// Require services token
const jwt = require('../../services/token');

router.route('/')
    /**
        * POST /v1/register
        * @summary Register a new user on activity
        * @tags Register user to activity
        * @security BearerAuth
        * @param {object} request.body.required - User id && Activity id
        * @return {object} 200 - Register object
        * @return {object}  500 - Error
        * @example request - User data
        * {
        *  "id_user": "Number Integer",
        *  "id_activity": "Number Integer"
        * }
        * @example response - 200 - success response example
        * {
        * "id": 1,
        * "id_user": 1,
        * "id_activity": 1,
        * "createdAt": "2020-01-01T00:00:00.000Z",
        * "updatedAt": "2020-01-01T00:00:00.000Z"
        * }
        *  @example response - 500 - error response example
        * {
        *  "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */
    .post(
        controllerHandler(jwt.verifyToken),
        validator('body', registerPostSchema),
        controllerHandler(registerController.createRegister),
    );

router.route('/:id/manage')
    /**
        * GET /v1/register/{id}/manage
        * @summary Get a register
        * @tags Register user to activity
        * @param {number} id.path - Register id
        * @return {object} 200 - Register object
        * @return {object}  500 - Error
        * @example response - 200 - success response example
        * {
        * "id_user": 1,
        * "id_activity": 3,
        * "activity_name": "Activity name",
        * "activity_description": "Activity description",
        * "activity_date": "2020-01-01T00:00:00.000Z",
        * "category_name": "Category name",
        * "user_firstname": "firstname",
        * "user_lastname": "lastname",
        * "user_email": "email"
        * }
        *  @example response - 500 - error response example
        * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */
    .get(
        validator('params', registerGetSchema),
        controllerHandler(registerController.getOneRegister),
    )
/**
        * PATCH /v1/register/{id}/manage
        * @summary Update a register
        * @tags Register user to activity
        * @security BearerAuth
        * @param {number} id.path - Register id
        * @param {object} request.body.required - User id && Activity id
        * @return {object} 200 - Register object
        * @return {object}  500 - Error
        * @example request - User data
        * {
        * "id_user": "Number Integer",
        * "id_activity": "Number Integer"
        * }
        * @example response - 200 - success response example
        * {
        * "id": 1,
        * "id_user": 1,
        * "id_activity": 1,
        * "createdAt": "2020-01-01T00:00:00.000Z",
        * "updatedAt": "2020-01-01T00:00:00.000Z"
        * }
        *  @example response - 500 - error response example
        * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */
    .patch(
        controllerHandler(jwt.verifyToken),
        validator('body', registerPostSchema),
        controllerHandler(registerController.updateRegister),
    )
    /**
        * DELETE /v1/register/{id}/manage
        * @summary Remove a register
        * @tags Register user to activity
        * @security BearerAuth
        * @param {number} id.path - Register id
        * @return {object} 200 - Register object
        * @return {object}  500 - Error
        * @example response - 200 - success response example
        * {
        * "id": 1,
        * "id_user": 1,
        * "id_activity": 1,
        * "createdAt": "2020-01-01T00:00:00.000Z",
        * "updatedAt": "2020-01-01T00:00:00.000Z"
        * }
        *  @example response - 500 - error response example
        * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */
    .delete(
        controllerHandler(jwt.verifyToken),
        validator('params', registerGetSchema),
        controllerHandler(registerController.removeRegister),
    );

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

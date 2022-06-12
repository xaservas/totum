const express = require('express');

const router = express.Router();
const userController = require('../../controllers/api/userController');

const apiErrorController = require('../../controllers/api/error');

// Require validator and schemas Joi
const validator = require('../../validation/validator');
const userGetSchema = require('../../validation/schemas/user/userGet.schema');
const userPostSchema = require('../../validation/schemas/user/userPost.schema');
const userLoginSchema = require('../../validation/schemas/user/userLogin.schema');
const userManageSchema = require('../../validation/schemas/user/userManage.schema');

// Require controllers try catch
const controllerHandler = require('../../helpers/controllerHandler');

//  Require error handler
const errorHandler = require('../../helpers/errorHandler');

router.route('/login')
    /**
        * POST /v1/user/login
        * @summary Login user
        * @tags Manage user
        * @param {object} request.body.required - User data
        * @return {object} 200 - User object
        * @return {object}  500 - Error
        * @example request - User data
        * {
        *  "email": "test@test.com",
        *  "password": "test"
        * }
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
        *  "message": "Invalid credentials"
        * }
        */
    .post(
        validator('body', userLoginSchema),
        controllerHandler(userController.login),
    );

router.route('/logout')
    .get(
        validator('query', userGetSchema),
        controllerHandler(userController.logout),
    );

router.route('/createNew')
    /**
        * POST /v1/user/createNew
        * @summary Create new user
        * @tags Manage user
        * @param {object} request.body.required - User data
        * @return {object} 200 - User object
        * @return {object}  500 - Error
        * @example request - User data
        * {
        * "email": "test@test.com",
        * "password": "hash",
        * "firstname": "firstname",
        * "lastname": "lastname",
        * "about": "presentation about user",
        * "address": "address",
        * "zip_code": "zip_code",
        * "city": "city",
        * "country": "country",
        * "cookie": "true / false (false by default)",
        * "landmark": "true / false (false by default)"
        * }
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
        *  "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */
    .post(
        validator('body', userPostSchema),
        controllerHandler(userController.createUser),
    );

router
    .route('/:id/manage')
    /**
        * GET /v1/user/{id}/manage
        * @summary Get user data by id
        * @tags Manage user
        * @param {number} id.path - User id
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
        validator('query', userGetSchema),
        controllerHandler(userController.getOneUser),
    )

    /**
        * PATCH /v1/user/{id}/manage
        * @summary Update user by id
        * @tags Manage user
        * @param {number} id.path.required - User id
        * @param {object} request.body.required - User data
        * @return {object} 200 - User object
        * @return {object}  500 - Error
        * @example request - User data
        * {
        * "firstname": "firstname",
        * "lastname": "lastname",
        * "about": "presentation about user",
        * "address": "address",
        * "zip_code": "zip_code",
        * "city": "city",
        * "country": "country",
        * "cookie": "true / false (false by default)",
        * "landmark": "true / false (false by default)"
        * }
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
        *  "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */
    .patch(
        validator('body', userManageSchema),
        controllerHandler(userController.updateUser),
    )
/**
        * DELETE /v1/user/{id}/manage
        * @summary Remove user by id
        * @tags Manage user
        * @param {number} id.path.required - User id
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
    .delete(
        validator('query', userGetSchema),
        controllerHandler(userController.removeUser),
    );

router.route('/:id/activity')
/**
        * GET /v1/user/{id}/activity
        * @summary Get user activities by id
        * @tags Manage user
        * @param {number} id.path.required - User id
        * @return {object} 200 - Array of activities for user
        * @return {object}  500 - Error
        * @example response - 200 - success response example
        * {
        * "user_id": 1,
        * "user_email": "test@test.com",
        * "user_firstname": "firstname",
        * "user_lastname": "lastname",
        * "activity_name": "activity name",
        * "activity_description": "activity description",
        * "activity_date": "2020-05-05T14:00:00.000Z",
        * "category_name": "category name",
        * "level_name": "level name"
        * }
        *  @example response - 500 - error response example
        * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
 */
    .get(
        validator('query', userGetSchema),
        controllerHandler(userController.getActivity),
    );

router.route('/:id/manage/passwordUpdate')
/**
        * POST /v1/user/{id}/manage/passwordUpdate
        * @summary Update user password by id
        * @tags Manage user
        * @param {number} id.path.required - User id
        * @param {object} request.body.required - User data
        * @return {object} 200 - User object
        * @return {object}  401 - Error
        * @return {object}  500 - Error
        * @example request - User data
        * {
        * "password": "new password",
        * "passwordConfirmation": "new password"
        * }
        * @example response - 200 - success response example
        * {
        * "message": "Password updated"
        * }
        *  @example response - 500 - error response example
        * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        *  @example response - 401 - error response example
        * {
        * "message": "Passwords do not match"
        * }
 */
    .post(
        validator('body', userManageSchema),
        controllerHandler(userController.updatePassword),
    );

router.route('/:id/manage/emailUpdate')
/**
        * POST /v1/user/{id}/manage/emailUpdate
        * @summary Update user email by id
        * @tags Manage user
        * @param {number} id.path.required - User id
        * @param {object} request.body.required - User data
        * @return {object} 200 - User object
        * @return {object}  401 - Error
        * @return {object}  500 - Error
        * @example request - User data
        * {
        * "email": "email",
        * "emailNew": "new email",
        * "emailConfirmation": "new email"
        * }
        * @example response - 200 - success response example
        * {
        * "message": "email updated"
        * }
        *  @example response - 500 - error response example
        * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        *  @example response - 401 - error response example
        * {
        * "message": "email do not match",
        * "message": "email is the same as the old one"
        * }
 */
    .post(
        validator('body', userManageSchema),
        controllerHandler(userController.updateEmail),
    );

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

const express = require('express');

const router = express.Router();
const commentController = require('../../controllers/api/commentController');

// Require validator and schemas Joi
const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');
const commentGetSchema = require('../../validation/schemas/comment/commentGet.schema');
const commentPostSchema = require('../../validation/schemas/comment/commentPost.schema');
const commentManageSchema = require('../../validation/schemas/comment/commentManage.schema');

// Require controllers try catch
const controllerHandler = require('../../helpers/controllerHandler');

//  Require error handler
const errorHandler = require('../../helpers/errorHandler');

// Require services token
const jwt = require('../../services/token');

router.route('/:id/user')
    /**
     * GET /v1/comment/{id}/user
     * @summary Get all comments of a user
     * @tags Comments
     * @param {number} id.path.required - User id
     * @return {object} 200 - Comments object
     * @return {object}  500 - Error
     * @example response - 200 - success response example
     * [
     * {
     * "comment_id": 1,
     * "comment_content": "string",
     * "comment_date": "2020-01-01T00:00:00.000Z",
     * "id_user": 1,
     * "user_email": "test@test.fr",
     * "user_firstname": "string",
     * "user_lastname": "string",
     * "activity_id": 1,
     * "activity_name": "string"
     * }
     * ]
     * @example response - 500 - error response example
     * {
     * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
     * }
     */
    .get(
        validator('params', commentGetSchema),
        controllerHandler(commentController.getByUser),
    );

router.route('/:id/activity')
    /**
     * GET /v1/comment/{id}/activity
     * @summary Get all comments of an activity
     * @tags Comments
     * @param {number} id.path.required - User id
     * @return {object} 200 - Comments object
     * @return {object}  500 - Error
     * @example response - 200 - success response example
     * [
     * {
     * "comment_id": 1,
     * "comment_content": "string",
     * "comment_date": "2020-01-01T00:00:00.000Z",
     * "id_user": 1,
     * "user_email": "test@test.fr",
     * "user_firstname": "string",
     * "user_lastname": "string",
     * "activity_id": 1,
     * "activity_name": "string"
     * }
     * ]
     * @example response - 500 - error response example
     * {
     * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
     * }
     */
    .get(
        validator('params', commentGetSchema),
        controllerHandler(commentController.getByActivity),
    );

router.route('/createNew')
    /**
     * POST /v1/comment/createNew
     * @summary Create a new comment
     * @tags Comments
     * @security BearerAuth
     * @param {object} request.body.required - Comment object
     * @return {object} 200 - Comments object
     * @return {object}  500 - Error
     * @example request - Comment object
     * {
     * "content": "string",
     * "picture": "string",
     * "id_user": 1,
     * "id_activity": 1
     * }
     * @example response - 200 - success response example
     * {
     * "id": 1,
     * "content": "string",
     * "picture": "string",
     * "id_user": 1,
     * "id_activity": 1,
     * "created_at": "2020-01-01T00:00:00.000Z",
     * "updated_at": "2020-01-01T00:00:00.000Z"
     * }
     * @example response - 500 - error response example
     * {
     * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
     * }
     */
    .post(
        controllerHandler(jwt.verifyToken),
        validator('body', commentPostSchema),
        controllerHandler(commentController.createComment),
    );

router.route('/:id/manage')
    /**
     * GET /v1/comment/{id}/manage
     * @summary Get a comment by id
     * @tags Comments
     * @param {number} id.path.required - Comment id
     * @return {object} 200 - Comment object
     * @return {object}  500 - Error
     * @example response - 200 - success response example
     * {
     * "id": 1,
     * "content": "string",
     * "picture": "string",
     * "id_user": 1,
     * "id_activity": 1,
     * "created_at": "2020-01-01T00:00:00.000Z",
     * "updated_at": "2020-01-01T00:00:00.000Z"
     * }
     * @example response - 500 - error response example
     * {
     * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
     * }
     */
    .get(
        validator('params', commentGetSchema),
        controllerHandler(commentController.getOneComment),
    )

    /**
     * PATCH /v1/comment/{id}/manage
     * @summary Update a comment by id
     * @tags Comments
     * @security BearerAuth
     * @param {number} id.path.required - Comment id
     * @param {object} request.body.required - Comment object
     * @return {object} 200 - Comment object
     * @return {object}  500 - Error
     * @example request - Comment object
     * {
     * "content": "string",
     * "picture": "string"
     * }
     * @example response - 200 - success response example
     * {
     * "id": 1,
     * "content": "string",
     * "picture": "string",
     * "id_user": 1,
     * "id_activity": 1,
     * "created_at": "2020-01-01T00:00:00.000Z",
     * "updated_at": "2020-01-01T00:00:00.000Z"
     * }
     * @example response - 500 - error response example
     * {
     * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
     * }
     */
    .patch(
        controllerHandler(jwt.verifyToken),
        validator('params', commentGetSchema),
        validator('body', commentManageSchema),
        controllerHandler(commentController.updateComment),
    )

    /**
     * DELETE /v1/comment/{id}/manage
     * @summary Delete a comment by id
     * @tags Comments
     * @security BearerAuth
     * @param {number} id.path.required - Comment id
     * @return {object} 200 - Comment object
     * @return {object}  500 - Error
     * @example response - 200 - success response example
     * {
     * "id": 1,
     * "content": "string",
     * "picture": "string",
     * "id_user": 1,
     * "id_activity": 1,
     * "created_at": "2020-01-01T00:00:00.000Z",
     * "updated_at": "2020-01-01T00:00:00.000Z"
     * }
     * @example response - 500 - error response example
     * {
     * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
     * }
     */
    .delete(
        controllerHandler(jwt.verifyToken),
        validator('params', commentGetSchema),
        controllerHandler(commentController.removeComment),
    );

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

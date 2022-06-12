const express = require('express');

const router = express.Router();
const userController = require('../../controllers/api/userController');

const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');

const userGetSchema = require('../../validation/schemas/user/userGet.schema');
const userPostSchema = require('../../validation/schemas/user/userPost.schema');
const userLoginSchema = require('../../validation/schemas/user/userLogin.schema');
const userManageSchema = require('../../validation/schemas/user/userManage.schema');

const controllerHandler = require('../../helpers/controllerHandler');
const errorHandler = require('../../helpers/errorHandler');

router.route('/login')
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
    .post(
        validator('body', userPostSchema),
        controllerHandler(userController.createUser),
    );

router
    .route('/:id/manage')
    .get(
        validator('query', userGetSchema),
        controllerHandler(userController.getOneUser),
    )
    .patch(
        validator('body', userManageSchema),
        controllerHandler(userController.updateUser),
    )
    .delete(
        validator('query', userGetSchema),
        controllerHandler(userController.removeUser),
    );

router.route('/:id/activity')
    .get(
        validator('query', userGetSchema),
        controllerHandler(userController.getUserActivity),
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

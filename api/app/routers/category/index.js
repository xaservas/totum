const express = require('express');

const router = express.Router();
const activityController = require('../../controllers/api/activityController');

const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');

const categoryGetSchema = require('../../validation/schemas/category/categoryGet.schema');
const categoryPostSchema = require('../../validation/schemas/category/categoryPost.schema');
const categoryManageSchema = require('../../validation/schemas/category/categoryManage.schema');

const controllerHandler = require('../../helpers/controllerHandler');
const errorHandler = require('../../helpers/errorHandler');
const categoryController = require('../../controllers/api/categoryController');

// liste des routes

router.route('categories')
    .get(
        validator('query', categoryGetSchema),
        controllerHandler(categoryController.getAll),
      );

router.route('category/createNew')

    .post(
        validator('body', categoryPostSchema),
        controllerHandler(categoryController.createCategory),
    );

router.route('/category/:id/manage')

.get(
    validator('body', categoryGetSchema),
    controllerHandler(categoryController.getOneCategory),
),

router.route('')



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

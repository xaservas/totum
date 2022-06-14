const express = require('express');

const router = express.Router();
const categoryController = require('../../controllers/api/categoryController');

const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');

const categoryGetSchema = require('../../validation/schemas/category/categoryGet.schema');
const categoryPostSchema = require('../../validation/schemas/category/categoryPost.schema');
const categoryManageSchema = require('../../validation/schemas/category/categoryManage.schema');

const controllerHandler = require('../../helpers/controllerHandler');
const errorHandler = require('../../helpers/errorHandler');
const jwt = require('../../services/token');

router.route('categories')
/**
        * GET /v1/user/categories
        * @summary See Categories
        * @tags Categories
        * @return {object} 200 - Categorie object
        * @return {object}  500 - Error
        * @example response - 200 - success response example
        * {
        * "picto": "<FontAwesomeIcon icon='fa-thin fa-alicorn' />",
        * "id_user": "1"
        *  }
        *  @example response - 500 - error response example
       * {
        * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
        * }
        */
    .get(
        validator('query', categoryGetSchema),
        controllerHandler(categoryController.getAll),
    );

router.route('category/createNew')

    .post(
        controllerHandler(jwt.verifyToken),
        validator('body', categoryPostSchema),
        controllerHandler(categoryController.createCategory),
    );

router.route('/category/:id/manage')

    .get(
        validator('body', categoryGetSchema),
        controllerHandler(categoryController.getOneCategory),
    )

    .patch(
        controllerHandler(jwt.verifyToken),
        validator('body', categoryManageSchema),
        controllerHandler(categoryController.updateCategory),
    )

    .delete(
        controllerHandler(jwt.verifyToken),
        validator('query', categoryManageSchema),
        controllerHandler(categoryController.removeCategory),
    );

router.route('');

router.use(apiErrorController.error404);
router.use(errorHandler);

module.exports = router;

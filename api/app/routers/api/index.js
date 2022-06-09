const express = require('express');

const router = express.Router();
const cadexController = require('../../controllers/api/cadex');
const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');
const cadexGetSchema = require('../../validation/schemas/cadexGet.schema');
const cadexPostSchema = require('../../validation/schemas/cadexPost.schema');
const controllerHandler = require('../../helpers/controllerHandler');
const errorHandler = require('../../helpers/errorHandler');
/*
router.get('/cadex', cadexController.get);
router.post('/cadex', cadexController.post);
*/
// equivalent à

router.route('/cadex')
    /**
     * GET /api/cadex
     * @summary To get a random cadex and personalize it
     * @param {string} noun.query - cadex personalized noun
     * @param {string} adjective.query - cadex personalized adjective
     * @param {string} verb.query - cadex personalized verb
     * @param {string} complement.query - cadex personalized complement
     * @return {cadex} 200 - success response
     * @return {error} 400 - input data invalid
     */
    .get(validator('query', cadexGetSchema), controllerHandler(cadexController.get))
    /**
     * POST /api/cadex
     * @summary To get a random cadex and feed new terms
     * @param {inputCadex} request.body.required - cadex new terms
     * @return {cadex} 200 - success response
     * @return {error} 400 - input data invalid
     */
    .post(validator('body', cadexPostSchema), controllerHandler(cadexController.post));

router.use(apiErrorController.error404);

// Il ira ici a partir du moment on l'on a ajouté un argument à next
// Si le next reçois un argument, il ne s'arretera pas dans le middleware précédent qui gère les 404
router.use(errorHandler);

module.exports = router;

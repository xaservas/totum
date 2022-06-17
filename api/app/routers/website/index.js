const express = require('express');

const router = express.Router();
const webErrorController = require('../../controllers/website/error');

// Require controllers try catch
const controllerHandler = require('../../helpers/controllerHandler');

//  Require error handler
const errorHandler = require('../../helpers/errorHandler');

const homepageController = require('../../controllers/website/homepageController');

router
  .route('/')

  /**
   * GET /
   * @summary Show homepage
   * @tags homepage
   * @return {object} 200 - Good
   * @return {object}  500 - Error
   * @example response - 200 - success response example
   * [
   *C'est tout bon
   * ]
   *  @example response - 500 - error response example
   * {
   * "error": "Une erreur est survenue, veuillez réessayer plus tard…"
   * }
   */
  .get(controllerHandler(homepageController.homePage));

router.use(webErrorController.error404);
router.use(errorHandler);

module.exports = router;

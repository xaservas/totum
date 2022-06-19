const express = require('express');

const router = express.Router();
const webErrorController = require('../../controllers/website/error');

// Require controllers try catch
const controllerHandler = require('../../helpers/controllerHandler');

//  Require error handler
const errorHandler = require('../../helpers/errorHandler');

const homepageController = require('../../controllers/website/homepageController');

router.route('/').get(controllerHandler(homepageController.homePage));

router.use(webErrorController.error404);
router.use(errorHandler);

module.exports = router;

const express = require('express');

const routerUser = require('./user');
const routerActivities = require('./activities');
const routerActivity = require('./activity');

const router = express.Router();

router.use('/v1/user', routerUser);
router.use('/v1/activities', routerActivities);
router.use('/v1/activity', routerActivity);

module.exports = router;

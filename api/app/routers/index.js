const express = require('express');

const routerUser = require('./user');
const routerActivities = require('./activities');
const routerActivity = require('./activity');
const routerCategory = require('./category');
const routerComment = require('./comment');
const routerRegister = require('./register');

const router = express.Router();

router.use('/v1/user', routerUser);
router.use('/v1/activities', routerActivities);
router.use('/v1/activity', routerActivity);
router.use('/v1/comment', routerComment);
router.use('/v1/caterory', routerCategory);
router.use('/v1/register', routerRegister);

module.exports = router;

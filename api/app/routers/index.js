const express = require('express');

const routerUser = require('./api/user');
const routerActivities = require('./api/activities');
const routerActivity = require('./api/activity');
const routerCategory = require('./api/category');
const routerComment = require('./api/comment');
const routerRegister = require('./api/register');
const routerMeta = require('./api/meta');
const routerLevel = require('./api/level');
const routerHomepage = require('./website/index');

const router = express.Router();

router.use('/v1/user', routerUser);
router.use('/v1/activities', routerActivities);
router.use('/v1/activity', routerActivity);
router.use('/v1/comment', routerComment);
router.use('/v1/category', routerCategory);
router.use('/v1/register', routerRegister);
router.use('/v1/meta', routerMeta);
router.use('/v1/level', routerLevel);
router.use('/', routerHomepage);

module.exports = router;

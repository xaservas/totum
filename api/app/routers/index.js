const express = require("express");
const controlle = require("../controllers/api/homepageController");

const routerUser = require("./user");
const routerActivities = require("./activities");
const routerActivity = require("./activity");
const routerCategory = require("./category");
const routerComment = require("./comment");
const routerRegister = require("./register");
const routerMeta = require("./meta");
const routerLevel = require("./levels");

// const routerHome = require('./homepage');

const router = express.Router();

router.use("/", controlle.homePage);
router.use("/v1/user", routerUser);
router.use("/v1/activities", routerActivities);
router.use("/v1/activity", routerActivity);
router.use("/v1/comment", routerComment);
router.use("/v1/category", routerCategory);
router.use("/v1/register", routerRegister);
router.use("/v1/meta", routerMeta);
router.use("/v1/level", routerLevel);

module.exports = router;

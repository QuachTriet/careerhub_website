const express = require("express");
const { getList, createApplication, getListJobseeker, getListByJobs } = require("../controllers/ApplicationsControllers");
const authenticated = require('../middlewares/Authencated');
const router = express.Router();

router.get("/", getList);
router.post("/create", authenticated, createApplication);
router.get("/getme", authenticated, getListJobseeker);
router.get("/getjob/:id", authenticated, getListByJobs);

module.exports = router;
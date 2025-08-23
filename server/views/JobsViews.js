const express = require("express");
const router = express.Router();
const { getList, createJob, updateJob, deteleJob, getJob } = require("../controllers/JobsControllers");
const authenticated = require("../middlewares/Authencated");

router.get('/', getList);
router.post('/create', authenticated, createJob);
router.put('/update/:id', authenticated, updateJob);
router.delete('/delete/:id', authenticated, deteleJob);
router.get('/:id', getJob);
module.exports = router;
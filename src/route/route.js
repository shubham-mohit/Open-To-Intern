const express = require('express');
const router = express.Router()
const collegecontrol = require('../controller/college')
const Interncontrol = require('../controller/Intern')

router.post("/createcollege" , collegecontrol.createcollege)
router.post("/createIntern" , Interncontrol.createIntern)
router.get("/:collegeName" , collegecontrol.getInternData)


module.exports = router
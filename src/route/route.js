const express = require('express');
const router = express.Router()
const collegecontrol = require('../controller/college')
const Interncontrol = require('../controller/Intern')

router.post("/functionup/colleges" , collegecontrol.createcollege)
router.post("/functionup/interns" , Interncontrol.createIntern)
router.get("/functionup/collegeDetails" , collegecontrol.getInternData)


module.exports = router
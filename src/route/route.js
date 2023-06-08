const express = require('express');
const router = express.Router()
const collegecontrol = require('../controller/college')

router.post("/createcollege" , collegecontrol.createcollege)


module.exports = router
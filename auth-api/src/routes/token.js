const express = require('express')
const router = express.Router()

const sessionController = require('../controllers/sessionController')

router.post('/', sessionController.generateToken)

module.exports = router

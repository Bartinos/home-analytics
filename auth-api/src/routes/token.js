const express = require('express')
const router = express.Router()

const sessionController = require('../controllers/sessionController')

router.get('/', sessionController.generateToken)

module.exports = router

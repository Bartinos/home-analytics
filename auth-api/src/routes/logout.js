
const express = require('express')
const router = express.Router()

const logoutController = require('../controllers/logoutController')

router.delete('/', logoutController.logout)

module.exports = router

const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

router.post('/', userController.login)

module.exports = router

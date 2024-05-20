const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')
const { loginValidation } = require('../validations/loginValidation')

router.post('/', loginValidation, loginController.login)

module.exports = router

const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicController')
const { authenticate } = require('../middleware/authentication')

router.get("/", authenticate, topicController.getAllTopics)

module.exports = router

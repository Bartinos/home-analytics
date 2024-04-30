const express = require('express')
const router = express.Router()
const measurementController = require('../controllers/measurementController')

router.get("/", measurementController.getAllMeasurements)

module.exports = router

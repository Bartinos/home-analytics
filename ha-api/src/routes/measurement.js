const express = require('express')
const router = express.Router()
const measurementController = require('../controllers/measurementController')
const { getMeasurementsValidation, postMeasurementValidation } = require('../validations/measurementValidation')

router.get("/", getMeasurementsValidation, measurementController.getMeasurements)
router.post("/", postMeasurementValidation, measurementController.postMeasurement)

module.exports = router

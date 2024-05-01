const express = require('express')
const router = express.Router()
const measurementController = require('../controllers/measurementController')
const { getMeasurementsValidation, postMeasurementValidation } = require('../validations/measurementValidation')
const { authenticate } = require('../middleware/authentication')

router.get("/", authenticate, getMeasurementsValidation, measurementController.getMeasurements)
router.post("/", authenticate, postMeasurementValidation, measurementController.postMeasurement)

module.exports = router

const Joi = require('joi')
const MAX_SUPPORTED_UNIX_DATE = 8640000000000 // 2243-10-17T00:00:00.000Z, prevent new Date() from creating invalid date
const MIN_SUPPORTED_UNIX_DATE = -8640000000000
const postMeasurementSchema = Joi.object({
  country: Joi.string().required(),
  city: Joi.string().required(),
  building: Joi.string().required(),
  space: Joi.string().required(),
  sensor: Joi.string().required(),
  value: Joi.number().required(),
  timestamp: Joi.date().timestamp('unix').min(MIN_SUPPORTED_UNIX_DATE).max(MAX_SUPPORTED_UNIX_DATE)
})

const postMeasurementValidation = (req, res, next) => {
  const { error } = postMeasurementSchema.validate(req.body)
  if (error) {
    console.error(error)
    return res.status(400).json({ error: error.details[0].message })
  }
  // If validation passes, proceed to the next middleware or route handler
  next()
}

const getMeasurementsSchema = Joi.object({
  since: Joi.date().timestamp('unix').min(MIN_SUPPORTED_UNIX_DATE).max(MAX_SUPPORTED_UNIX_DATE),
  country: Joi.string(),
  city: Joi.string(),
  building: Joi.string(),
  space: Joi.string(),
  sensor: Joi.string(),
})

const getMeasurementsValidation = (req, res, next) => {
  const {error } = getMeasurementsSchema.validate(req.query)
  if (error) {
    console.error(error)
    // If validation fails, send an error response
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}

module.exports = {
  postMeasurementValidation,
  getMeasurementsValidation
}

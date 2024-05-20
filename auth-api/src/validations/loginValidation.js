const Joi = require('joi')

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

const loginValidation = (req, res, next) => {
  const {error} = loginSchema.validate(req.body)
  
  if (error) {
    console.warn(error)
    return res.status(400).json({ error: error.details.map((error) => error.message) })
  }
  // If validation passes, proceed to the next middleware or route handler
  next()
}

module.exports = {
  loginValidation
}

const { readAllMeasurements } = require('../services/measurementService')
const getAllMeasurements = async (req, res, next) => {
  const allMeasurements = await readAllMeasurements();
  return res.status(200).json(allMeasurements)
}

module.exports = {
  getAllMeasurements
}

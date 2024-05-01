const { readAllMeasurements, createMeasurement } = require('../services/measurementService');
const { readTopicByMatchingValues, createTopic } = require('../services/topicService');


const getAllMeasurements = async (req, res, next) => {
  const allMeasurements = await readAllMeasurements();
  return res.status(200).json(allMeasurements)
}

const postMeasurement = async (req, res, next) => {
  const { country, city, building, space, sensor, value } = req.body
  // Check if topic already exists
  let matchingTopicResult = await readTopicByMatchingValues(country, city, building, space, sensor)
  
  // If there are no matching topics, then create a new one
  if (!matchingTopicResult) {
    matchingTopicResult = await createTopic(country, city, building, space, sensor)
  }
  console.log(matchingTopicResult)

  const createMeasurementResult = await createMeasurement(matchingTopicResult.id, value)
  if(!createMeasurementResult) {
    return res.sendStatus(500)
  }

  return res.sendStatus(201)
}

module.exports = {
  getAllMeasurements,
  postMeasurement
}

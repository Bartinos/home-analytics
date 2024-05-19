const { readMeasurements, createMeasurement, readMeasurementsGroupedByTopic, readMeasurementsByTopic } = require('../services/measurementService');
const { readTopicByMatchingValues, createTopic } = require('../services/topicService');
const WEEK_IN_SECONDS = 604800

const getMeasurements = async (req, res, next) => {
  // If no `since` param has been set, then take the timestamp in miliseconds from one week ago 
  const afterTimestamp = req.query.since? req.query.since * 1000 : (Date.now() - (WEEK_IN_SECONDS * 1000))
  
  let measurements = null

  const country = req.query.country
  const city = req.query.city
  const building = req.query.building
  const space = req.query.space
  const sensor = req.query.sensor
  if(country && city && building && space && sensor){
    let matchingTopicResult = await readTopicByMatchingValues(country, city, building, space, sensor)
    if(!matchingTopicResult){
      return res.status(404).json({errors: ["Could not find matching topic"]})
    }
    measurements = await readMeasurementsByTopic(afterTimestamp, matchingTopicResult.id)
    return res.status(200).json(measurements)
  }
   measurements = await readMeasurements(afterTimestamp)
  // const measurements = await readMeasurementsGroupedByTopic(afterTimestamp)
  return res.status(200).json(measurements)
}

const postMeasurement = async (req, res, next) => {
  const { country, city, building, space, sensor, value } = req.body
  // Check if topic already exists
  let matchingTopicResult = await readTopicByMatchingValues(country, city, building, space, sensor)
  
  // If there are no matching topics, then create a new one
  if (!matchingTopicResult) {
    matchingTopicResult = await createTopic(country, city, building, space, sensor)
  }
  // console.log(matchingTopicResult)

  const createMeasurementResult = await createMeasurement(matchingTopicResult.id, value)
  if(!createMeasurementResult) {
    return res.sendStatus(500)
  }

  return res.sendStatus(201)
}

module.exports = {
  getMeasurements,
  postMeasurement
}

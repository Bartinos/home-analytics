const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function readAllTopics() {
  const result = await prisma.topic.findMany()
  return result
}

async function readTopicByMatchingValues(country, city, building, space, sensor) {
  const result = await prisma.topic.findUnique({
    where: {
      country_city_building_space_sensor: {
        country,
        city,
        building,
        space,
        sensor
      }
    }
  })

  return result
}

async function createTopic(country, city, building, space, sensor) {
  const result = await prisma.topic.create({
    data: {
      country,
      city,
      building,
      space,
      sensor
    }
  })

  return result
}

module.exports = {
  readAllTopics,
  readTopicByMatchingValues,
  createTopic
}

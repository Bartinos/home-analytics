const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function readMeasurementsGroupedByTopic(afterTimestamp) {
  // const result = await prisma.measurement.groupBy({
  //   by: ['topic_id'],
  //   where: {
  //     created_at: { gt: new Date(afterTimestamp).toISOString() }
  //   },
  //   include: {
  //     topic: true
  //   },
  //   orderBy: {
  //     created_at: 'desc'
  //   }
  // })

  const aggregate = await prisma.measurement.groupBy({
    by: ['topic_id'],
  })
  const measurements = await prisma.measurement.findMany({
  })
  let result = [];
  let topicMeasurementGroup = {};
  // console.log(measurements.length)
  for (let i = 0; i < aggregate.length; i++) {
    topicMeasurementGroup['topic_id'] = aggregate[i].topic_id
    let measurementGroup = [];
    for (let j = 0; j < measurements.length; j++) {
      if (aggregate[i].topic_id == measurements[j].topic_id) {
        let element = {
          // ...aggregate[i],
          ...measurements[j],
        }
        measurementGroup.push(element);
      }
    }
    topicMeasurementGroup['measurements'] = measurementGroup
    result.push(topicMeasurementGroup)
  }

  return result
}
async function readMeasurements(afterTimestamp) {
  const result = await prisma.measurement.findMany({
    where: {
      created_at: { gt: new Date(afterTimestamp).toISOString() }
    },
    include: {
      topic: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return result
}

async function readMeasurementsByTopic(afterTimestamp, topicId) {
  const result = await prisma.measurement.findMany({
    where: {
      created_at: { gt: new Date(afterTimestamp).toISOString()},
      topic_id: Number(topicId)
      
    },
    // include: {
    //   topic: true
    // },
    orderBy: {
      created_at: 'desc'
    }
  })

  return result
}

async function createMeasurement(topicId, value) {
  const result = await prisma.measurement.create({
    data: {
      value: Number(value),
      topic_id: Number(topicId),
      created_at: new Date(Date.now()).toISOString()
    }
  })

  return result
}

module.exports = {
  readMeasurements,
  createMeasurement,
  readMeasurementsGroupedByTopic,
  readMeasurementsByTopic
}

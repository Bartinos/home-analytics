const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function readAllMeasurements() {
  const result = await prisma.measurement.findMany({
    include: {
      topic: true
    }
  })

  return result
}

async function createMeasurement(topicId, value){
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
  readAllMeasurements,
  createMeasurement
}

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
  readMeasurements,
  createMeasurement
}

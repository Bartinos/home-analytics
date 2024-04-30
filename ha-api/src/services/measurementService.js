const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function readAllMeasurements() {
  const result = await prisma.measurement.findMany({
    include: {
      topic: true
    }
  });
  return result
}

module.exports = {
  readAllMeasurements
}

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function readAllTopics () {
  const result = await prisma.topic.findMany()
  return result
}

module.exports = {
  readAllTopics
}

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllMeasurements = async (req, res, next) => {
  return res.status(200).json()
}

module.exports = {
  getAllMeasurements
}

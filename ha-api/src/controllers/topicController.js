const { readAllTopics } = require("../services/topicService")

const getAllTopics = async (req, res, next) => {
  const topicsResult = await readAllTopics()
  return res.status(200).json(topicsResult)
}

module.exports = {
  getAllTopics
}

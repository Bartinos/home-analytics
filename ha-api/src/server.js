const express = require('express')
const app = express()
app.use(express.json())

const measurementRoute = require('./routes/measurement')
const topicRoute = require('./routes/topic')

app.use("/measurements", measurementRoute)
app.use("/topics", topicRoute)

console.log("Listening on port 3001")
app.listen("3001")

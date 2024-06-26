const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
// app.use(logEndpoint)
// const corsOptions = { origin: ['*.bartvanmoorsel.com',]} 
const corsOptions = { origin: '*'} 
app.use(cors(corsOptions))
const measurementRoute = require('./routes/measurement')
const topicRoute = require('./routes/topic')

app.use("/measurements", measurementRoute)
app.use("/topics", topicRoute)

// console.log("Listening on port 3001")
app.listen("3001")

function logEndpoint(req, res, next) {
  console.log(req.url)
  next()
}

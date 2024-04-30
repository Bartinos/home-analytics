const express = require('express')
const app = express()

const measurementRoute = require('./routes/measurement')

app.use("/measurements", measurementRoute)

console.log("Listening on port 3001")
app.listen("3001")

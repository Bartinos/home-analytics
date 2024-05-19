const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
// app.use(logEndpoint)
// const corsOptions = { origin: ['*.bartvanmoorsel.com',]} 
const corsOptions = { origin: '*'} 
app.use(cors(corsOptions))

// Routes
const loginRoute = require('./routes/login')
const tokenRoute = require('./routes/token')
const logoutRoute = require('./routes/logout')
app.use("/login", loginRoute)
app.use("/token", tokenRoute)
app.use("/logout", logoutRoute)

function logEndpoint(req, res, next) {
    console.log(req.originalUrl)
    console.log(req.query)
    console.log(req.body)
    next()
}

app.listen(3000)

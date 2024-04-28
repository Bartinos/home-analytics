const express = require('express')
const app = express()
require('dotenv').config()
// Routes

const loginRoute = require('./routes/login')
// const tokenRoute = require('./routes/token')
const logoutRoute = require('./routes/logout')
app.use("/login", loginRoute)
// app.use("/tokens", tokenRoute)
app.use("/logout", logoutRoute)

app.listen(3000)

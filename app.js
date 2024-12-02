const express = require('express')
const path = require('path')
const app = express()

app.use('/carros', express.static(path.join(__dirname + '/public')))

app.use(express.json())

const carrosRoute = require('./carrosRoute')

app.use('/api/v1/carros', carrosRoute)

module.exports = app
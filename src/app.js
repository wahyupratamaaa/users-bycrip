require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require("path")
const controllers = require('./controllers')
const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.json({
    limit: '100mb',
    extended: true
}))
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}))
app.use("/assets", express.static(path.join(__dirname, "../assets")))

// Connention Test
app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    })
})

// Buat Controller di Dalam Folder Controllers 
// Danftarkan Controller pada file controllers/index.js
app.use('/api', controllers)

module.exports = app
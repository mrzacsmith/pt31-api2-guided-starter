const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const server = express()

const dogRouter = require('./dogs/dogs-router')
const adopterRouter = require('./adopters/adopters-router')

// Middleware
server.use(helmet())
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())

server.use('/api/v1/dogs', dogRouter)
server.use('/api/v1/adopters', adopterRouter)

server.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'API is running',
    time: new Date().toLocaleTimeString(),
  })
})

module.exports = server

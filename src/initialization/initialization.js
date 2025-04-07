const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const {
  config: { SERVER_URL }
} = require('../configs/config')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Space2Study API',
      version: '',
      description: 'API documentation for Space2Study'
    },
    servers: [
      {
        url: SERVER_URL
      }
    ]
  },
  apis: ['./docs/**/*.yaml']
}

const swaggerSettings = swaggerJsDoc(swaggerOptions)

const {
  config: { CLIENT_URL }
} = require('~/configs/config')
const router = require('~/routes')
const { createNotFoundError } = require('~/utils/errorsHelper')
const errorMiddleware = require('~/middlewares/error')

const initialization = (app) => {
  app.get('/', (req, res) => {
    res.send('Backend is working!')
  })

  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(
    cors({
      origin: process.env.NODE_ENV === 'development' ? true : CLIENT_URL,
      credentials: true,
      methods: 'GET, POST, PATCH, DELETE',
      allowedHeaders: 'Content-Type, Authorization'
    })
  )

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSettings))

  app.use('/', router)

  app.use((_req, _res, next) => {
    next(createNotFoundError())
  })

  app.use(errorMiddleware)
}

module.exports = initialization


const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs') 
const usersRouter = require('./controllers/users') 
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)


module.exports = app
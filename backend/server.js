const express = require('express')
const color = require('color')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


connectDB();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))

// 1st command > npm init
// 2nd command > npm i express dotenv mongoose color
 
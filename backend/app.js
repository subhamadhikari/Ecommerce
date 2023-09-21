require('express-async-errors');
require('dotenv').config()

const express = require("express")
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDB = require('./db/connectDB')
const errorHandler = require('./errorHandler/error')
const notFound = require('./errorHandler/not-founs')


//Middlewares
// app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(cookieParser())




//My Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentBRoutes = require('./routes/payment')



app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',orderRoutes)
app.use('/api',paymentBRoutes)


app.use(notFound)
app.use(errorHandler)


//Server
const port = process.env.PORT || 9000
const uri = process.env.MONGO_URI

const start = async () => {
    try {
        await connectDB(uri)
        app.listen(port,console.log(`Listening to the port:${port}`))
    } catch (error) {
        console.log(error.message) 
        return JSON({error:error.message})
    }
}

start()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')

const cors = require('cors')
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI).then( ()=>console.log('DB CONNECTED')).catch((err)=> console.log('ERROR'))

app.use(cors())
app.use(express.json())


app.use('/api',authRoute)
app.use('/api/users',userRoute)
app.use('/api/products',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/orders',orderRoute)
app.use("/api/checkout", stripeRoute);


app.listen(port,()=>console.log('Server listening on port '+port))



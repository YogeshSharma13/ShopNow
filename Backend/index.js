const connectToMongoose = require('./db');
const express = require("express");
const cors = require("cors");
const Razorpay = require('razorpay')
const fileUpload = require('express-fileupload');
const myParser = require("body-parser");

connectToMongoose();
const app = express();
const port = 3030;

app.use(myParser.json());
app.use(myParser.urlencoded({extended: true}));
app.use(cors())
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'uploads/'
}));




//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/order', require('./routes/order'))
app.use('/api/admin', require('./routes/admin'))


app.listen(port,()=>{
    console.log(`App started on PORT http://localhost:${port}`)
})

const connectToMongoose = require('./db');
const express = require("express");
const cors = require("cors");
const Razorpay = require('razorpay')
const fileUpload = require('express-fileupload');
const myParser = require("body-parser");
const path = require('path');
require('dotenv').config();

connectToMongoose();
const app = express();
const port = process.env.PORT || 3030;

app.use(myParser.json());
app.use(myParser.urlencoded({extended: true}));
app.use(cors())
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'uploads/'
}));

//server production asset
// app.use(express.static(path.join('/build')));
// app.get("*",(req,res)=> res.sendFile(path.resolve(__dirname,'build',"index.html")));




//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/order', require('./routes/order'))
app.use('/api/admin', require('./routes/admin'))

//heroku

if(process.env.NODE_ENV = "production"){
    app.use(express.static("frontend/build"))
}

app.listen(port,()=>{
    console.log(`App started on PORT http://localhost:${port}`)
})

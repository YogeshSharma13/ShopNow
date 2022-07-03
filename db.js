const mongoose = require('mongoose')
require('dotenv').config();
const mongoURI = process.env.Database;
const connectToMongoose = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoose successfully");
    })
}
module.exports = connectToMongoose;

// my mongo string
// mongodb+srv://yogesh:<password>@cluster0.ryiy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
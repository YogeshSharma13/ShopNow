const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://yogesh:4DKkAho4UJSu3hab@cluster0.ryiy8.mongodb.net/ecommerce?retryWrites=true&w=majority'
const connectToMongoose = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoose successfully");
    })
}
module.exports = connectToMongoose;

// my mongo string
// mongodb+srv://yogesh:<password>@cluster0.ryiy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
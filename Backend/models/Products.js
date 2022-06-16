const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductsSchema = new Schema({
    // _id:{
    //     type: String
    // },
    seller: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('products',ProductsSchema);
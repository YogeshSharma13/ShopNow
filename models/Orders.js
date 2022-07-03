const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrdersSchema = new Schema({
    buyer: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    sellerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
   product:{
       type: Object
   },
    address: {
        type: Object
    },
    date: {
        type: String
    },
    paymentId: {
        type: String
    },
    orderId: {
        type: String
    },
    signature: {
        type: String
    },
    status: {
        type: String
    }

})

module.exports = mongoose.model('orders',OrdersSchema);
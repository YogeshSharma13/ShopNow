const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Products = require("../models/Products");
const path = require('path');
const Orders = require('../models/Orders')
const Razorpay = require('razorpay');
const fetchAdmin = require("../middleware/fetchAdmin");



const key_id = 'rzp_test_McFUuk69vU92sC';
const key_secret = 'iMRirKEvK0hd1IHSXbxoaMrY';


var instance = new Razorpay({
    key_id,
    key_secret
  });

  //Buy single product
router.post("/:id",fetchUser, async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id)
      let product = await Products.findById(req.params.id);
      console.log(product);
      const amount = product.price*100;
      const currency = 'INR';
      const receipt = 'receipt#123';
      const notes = {desc: product.description};

      instance.orders.create({
        amount,
        currency,
        receipt,
        notes
      },(error,order)=>{
        if(error){
          return res.json(error);
        }

        // const order = new Orders({
        //   title,
        //   price,
        //   category,
        //   address,
        //   date: Date.now()
        // });
  
        // const savedOrder = await order.save();
        return res.status(200).json(order);
      })
      //res.send(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });

   //Buy Cart
router.post("/buyCart/:amount",fetchUser, async (req, res) => {
  // try {
    //const id = req.params.id;
    //let product = await Products.findById(req.params.id);
    const amount = req.params.amount*100;
    const currency = 'INR';
    const receipt = 'receipt#123';
    const notes = {desc: "Yogesh's Cart"};

    instance.orders.create({
      amount,
      currency,
      receipt,
      notes
    },(error,order)=>{
      if(error){
        return res.json(error);
      }
      console.log('hello')
      // const Order = new Orders({
      //   products:req.body.cart,
      //   address:req.body.address,
      //   date: Date.now()
      // });
      // console.log("order = " + Order)
      // const savedOrder = Order.save();
      return res.status(200).json(order);
    })
    //res.send(product);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Internal Server Error");
  // }
});

//add order to database

router.post("/addOrder",fetchUser, async (req, res) => {
  // try {
    //const id = req.params.id;
    //let product = await Products.findById(req.params.id);
    console.log("hii")
    req.body.products.map((e)=>{
      let d = new Date();
      let dat = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
      const Order = new Orders({
        product:e,
        address:req.body.address,
        date: dat,
        paymentId: req.body.paymentId,
        orderId: req.body.orderId,
        signature: req.body.signature,
        status: req.body.status,
        sellerId: e.seller,
        buyer: req.user.id
      });
      console.log("order = " + Order)
      const savedOrder = Order.save().then(()=>{
        console.log("success")
      }).catch((err)=>{
        console.log("error occured")
        console.log(err)
      });
      res.status(200).json();
    })
      
      //res.status(200).json();
   
    //res.send(product);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Internal Server Error");
  // }
});


//Route  - Get all Orders using GET - "/api/order/" - login required
router.get("/", fetchAdmin, async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Search an Order using orderId

router.get("/search/:key", async (req, res) => {
  try {
    const orders = await Orders.find({
      "$or": [
        {orderId: {$regex: req.params.key}}
      ]
    });
    res.send(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Get Order by status

router.get("/:stat", async (req, res) => {
  try {
    const pending = await Orders.find({
      "$or": [
        {status: {$regex: req.params.stat}}
      ]
    });
    res.send(pending);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});





  module.exports = router;
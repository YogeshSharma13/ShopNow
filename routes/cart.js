const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");
const Products = require("../models/Products");
const path = require('path')
let cartItems = [{}];
//Route 1 - Get user cart details - login required
router.get(
    "/",fetchUser , async (req, res) => {
  try {
      
    userId = req.user.id;
    const cart =await User.findById(userId).select("cart -_id");
    res.send(cart);
  } catch (err) {
    console.error(err.message);
        res.status(500).send("Internal Server Error");
  }
    }
  )

  //Route 2 - Add products to cart - login required
router.post(
    "/addToCart/:id",fetchUser , async (req, res) => {
  try {
    userId = req.user.id;
    const user =await User.findById(userId).select("cart -_id");
    const cartItem = await Products.findById(req.params.id);
    user.cart.push(cartItem);
    product = await User.findByIdAndUpdate(userId, {$set: user}, {new: true});
    res.send(user);
  } catch (error) {
    console.error(error.message);
        res.status(500).send("Internal Server Error");
  }
    }
  )


  //Route 3 - Remove products from cart - login required

  function isp(element) {
    console.log(element);
    return element._id===req.params.id;
  }

router.post(
  "/removeFromCart/:id",fetchUser , async (req, res) => {
try {
  let userId = req.user.id;
  const user =await User.findById(userId).select("cart -_id");
  let index;
  for(let e in user.cart){
    if(req.params.id==user.cart[e]._id){
      index = e;
    }
  }
  console.log(index);
  if(index!==-1){
    user.cart.splice(index,1);
  }

  const newProduct = {};
  newProduct.cart = user.cart; 
  console.log("-----------");
  console.log(user.cart);

  
  
  const product = await User.findByIdAndUpdate(userId, {$set: newProduct}, {new: true});
  res.send(product);
} catch (error) {
  console.error(error.message);
      res.status(500).send("Internal Server Error");
}
  }
)

  module.exports = router;
const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require("express-validator");
//const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const fetchAdmin = require("../middleware/fetchAdmin");

const jwt_secret = 'Yogesh@boy1';

//Route 1 - create a new user using POST "/api/auth/createUser" -no login required
router.post(
    "/createAdmin",
    [
        //validations
      body("name").isLength({ min: 3 }),
      body("email", "Enter a valid email").isEmail(),
      body("password", "Enter a valid password").isLength({ min: 5 }),
    ],
    async (req, res) => {
      // const user = User(req.body);
      // user.save();
      // console.log(req.body);
      // If there are errors return bad request and the error
      let success = false
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
          //check if user not already present with same email
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
          return res
            .status(400)
            .json({ error: "sorry an admin with this email already exist" });
        }
        //creating new user here
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password,salt);
        admin = await Admin.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        //   .then(user => res.json(user)).catch(err => {
        //       console.log(err);
        //       res.json({error: 'Please enter a unique email'})
        //   });
        
        const data = {
          admin: {
            id: admin.id
          }
        }
        const adminAuthToken = jwt.sign(data, jwt_secret);
        success = true;
        // res.json(user);
        res.json({success,adminAuthToken})
      }
      //catch errors 
      catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  
  //Route 2 - Authenticate a user using POST - "/api/admin/login" -no login required 
  router.post(
    "/login",
    [
        //validations
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password cannot be Blank").exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {email,password} = req.body;
      try {
        let admin = await Admin.findOne({email});
        if(!admin){
          success = false;
          res.status(400).json({success: false,message: "Enter valid email or password"});
        }
  
        const passCompare = await bcrypt.compare(password,admin.password)
        if(!passCompare){
          success = false;
          res.status(400).json({success: false,message: "Enter valid email or password"});
  
        }
  
        const data = {
            admin: {
            id: admin.id
          }
        }
        const adminAuthToken = jwt.sign(data,jwt_secret);
        success = true;
        res.json({success,adminAuthToken})
  
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
      }
    }
  )
  
  //Route 3 - Get loggedIn User details using POST - "/api/auth/getUser" - login required 
  router.post(
    "/getUser",fetchUser , async (req, res) => {
  try {
    let adminId = req.admin.id;
    const admin =await Admin.findById(adminId).select("-password");
    res.send(admin)
  } catch (err) {
    console.error(err.message);
        res.status(500).send("Internal Server Error");
  }
    }
  )

  //Route 3 - Get loggedIn User details using POST - "/api/admin/getUser" - login required 
router.post(
    "/getUser",fetchAdmin , async (req, res) => {
  try {
    let adminId = req.admin.id;
    const admin =await Admin.findById(adminId).select("-password");
    res.send(admin)
  } catch (error) {
    console.error(err.message);
        res.status(500).send("Internal Server Error");
  }
    }
  )

  module.exports = router;
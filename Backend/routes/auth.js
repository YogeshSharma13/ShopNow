const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require("express-validator");
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const fetchAdmin = require("../middleware/fetchAdmin");
const Admin = require("../models/Admin");

Admin


const jwt_secret = 'Yogesh@boy1';

const sendMail = async (otpData,name) =>{
  //let transporter = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "sharmayogesh13@outlook.com", // generated ethereal user
      pass: "13072000@#", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "sharmayogesh13@outlook.com", // sender address
    to: otpData.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Hi ${name}, 
    You recently requested to reset your password for your ShopNow account. ${otpData.code} is the otp to change the password. this is only valid for 10 minutes.`, // plain text body
    //html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

//Route 1 - create a new user using POST "/api/auth/createUser" -no login required
router.post(
  "/createUser",
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
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exist" });
      }
      //creating new user here
      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //   .then(user => res.json(user)).catch(err => {
      //       console.log(err);
      //       res.json({error: 'Please enter a unique email'})
      //   });
      
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      // res.json(user);
      res.json({success,authToken})
    }
    //catch errors 
    catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 2 - Authenticate a user using POST - "/api/auth/login" -no login required 
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
      let user = await User.findOne({email});
      if(!user){
        success = false;
        res.status(400).json({success: false,message: "Enter valid email or password"});
      }

      const passCompare = await bcrypt.compare(password,user.password)
      if(!passCompare){
        success = false;
        res.status(400).json({success: false,message: "Enter valid email or password"});

      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data,jwt_secret);
      success = true;
      res.json({success,authToken})

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
  userId = req.user.id;
  const user =await User.findById(userId).select("-password");
  res.send(user)
} catch (error) {
  console.error(err.message);
      res.status(500).send("Internal Server Error");
}
  }
)

// send email - no login required

router.post("/sendEmail",async (req,res) =>{
  console.log(req.body);
  const email = req.body.email;
  const resType = {};
  console.log(email);
  let user = await User.findOne({email});
  console.log(user)
  if(!user){
    res.status(401).json({
      status: "Failed",
      message: "Enter a Valid email Id"
    })
  }
  else{

 
  let otpcode = Math.floor(Math.random()*10000+1);
  let otpData = new Otp({
    email: req.body.email,
    code:otpcode,
    expireIn: new Date().getTime() + 300*1000
  });
  console.log(otpData)

  const otpResponse = await otpData.save();
  sendMail(otpData,user.name).catch(console.error);
  resType.status = "Success";
    resType.message = "Please Check your Email Id for Otp";
}

  res.status(200).send(resType);
})

//change password
router.post('/changePass', async (req,res) =>{
  res.status(200).json({
    email: req.body.email,
    password: req.body.password
  })
})

//Validate otp
router.post('/validateOtp', async (req,res) =>{
  //res.status(200).send("changed")
  let otp = await Otp.findOne({email:req.body.email});
  if(!otp.code===req.body.eOtp){
    res.json({
      message: "Please Enter a Valid Otp",
      success: false
    })
  }
  console.log(otp.code===req.body.eOtp);
  res.status(200).json({
    message: "Otp validation successfull",
    success: true
  })

  await Otp.findOneAndDelete({email:req.body.email})
})

//Get loggedIn Admin details using POST - "/api/auth/getUser" - login required 
router.post(
  "/getAdmin",fetchAdmin , async (req, res) => {
try {
  const adminId = req.admin.id;
  const admin =await Admin.findById(adminId).select("-password");
  res.send(admin)
} catch (error) {
  console.error(err.message);
      res.status(500).send("Internal Server Error");
}
  }
)

module.exports = router;

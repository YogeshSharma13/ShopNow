const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Products = require("../models/Products");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require("express-validator");
const fetchAdmin = require("../middleware/fetchAdmin");
const fileUpload = require("express-fileupload");
const FormData = require("form-data");
const formidable = require("formidable");

//const image = require('../images/1654428048861-profilePic.jpeg')
//const path = require('path');

//router.app(express.static(__dirname+"./public/"))

//Define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function(request,file,cb){
    cb(null,"uploads/");
  },
  filename: function(request,file,cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({storage:storage});

//upload parameters for multer
// const upload = multer({
//   storage: multer.diskStorage({
//     //destination for files
//     destination: function (request, file, callback) {
//       callback(null, '/Users/yogesh.sharma/Desktop/TodoApp/ecommerce/public/uploads');
//     },
//     //add back the extension
//     filename: function (request, file, callback) {
//       //console.log(file);
//       callback(null, file.fieldname + "-" + Date.now() + ".jpeg");
//     },
//   }),
// });

//const upload = multer({dest: 'uploads/'});

//express fileupload



//Route 1 - Get all products using GET - "/api/products/" - no login required
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 3 - Get all products of a seller using GET - "/api/products/getsellerProducts" - login required
router.get("/getsellerProducts", fetchAdmin, async (req, res) => {
  try {
    console.log("hello");
    const products = await Products.find();
    console.log(products);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 8 - Get product detail using GET - "/api/product/:id" - no login required

router.get("/:id", async (req, res) => {
  try {
    const products = await Products.find({ _id: req.params.id });
    console.log(products);
    res.send(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// //Route 9 - Get sorted products using GET - "/api/product/sort" - no login required

router.post("/sort", async (req, res) => {
  try {
    // console.log(req.params)
    // let products = [];
    // console.log(req.params.category==='undefined');
    // if(req.params.category==='undefined'){
    //   products = await Products.find({}).sort({price:req.params.key});
    // }
    // else{
    // products = await Products.find({category:req.params.category}).sort({price:req.params.key});
    // }
    let products = req.body.products;
    console.log(req.body);
    console.log(req.body.key === "asc");
    if (req.body.key === "asc") {
      products.sort((a, b) => a.price - b.price);
    } else {
      products.sort((a, b) => b.price - a.price);
    }
    console.log(products);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 2 - Add new products using POST - "/api/products/addProduct" - login required
router.post(
  "/addProduct",
  fetchAdmin,
  [
    body("title").isLength({ min: 3 }),
    body("price", "Enter a valid price").exists(),
    body("category", "Enter a valid category").isLength({ min: 5 }),
    body("description", "Enter a valid category").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // upload(req,res,(err)=>{
    try {
      //   console.log(req.formData);
      //   console.log("------------");
      //   console.log(req.body);
      //   console.log("------------");
      //   console.log(req.files);
      //   //console.log(formData);
      //   let fileName = Date.now() + '-' + req.files.image.name;
      //   let newPath = path.join('/Users/yogesh.sharma/Desktop/TodoApp/ecommerce/public/uploads',fileName);//let newPath = path.join(process.cwd(),'images',fileName);
      // req.files.image.mv(newPath);

      //console.log(req);

      //console.log(req.files.image);
      console.log(req);
      console.log(req.body);
      const { title, price, category, description,image} = req.body;
      //console.log(image);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // const form = new formidable.IncomingForm();
      // console.log(form);
      // form.on("file", function (name, file) {
      //   console.log("file=" + file);
      // }); //its not printing
      // form.on("error", function (err) {
      //   console.log(err);
      // }); //its not printing
      // form.on("aborted", function () {
      //   console.log("Aborted");
      // }); //its not printing
      // form.parse(req, (err, fields, file) => {
      //   console.log(fields);
      //   console.log(file);
      //   console.log(err);
      //   res.send("Done");
      // });

      const product = new Products({
        title,
        price,
        category,
        description,
        seller: req.admin.id,
        image
      });
      console.log(product);

      const savedProduct = product.save().then(()=>res.send("uploaded successfully")).catch((err)=>{
        console.log("some error occurred -- " + err)
      });

      res.json(savedProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
    // })
  }
);



//Route 4 - Update an existing product using PUT - "/api/product/updateproduct" - login required
router.put("/updateproduct/:id", fetchUser, async (req, res) => {
  try {
    const { name, price, category } = req.body;
    //create a newProduct object
    const newProduct = {};
    if (name) {
      newProduct.name = name;
    }
    if (price) {
      newProduct.price = price;
    }
    if (category) {
      newProduct.category = category;
    }

    //Find the product and update it
    let product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Not Found");
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    product = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json({ product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 5 - Delete an existing product using DELETE - "/api/product/deleteproduct" - login required
router.delete("/deleteproduct/:id", fetchAdmin, async (req, res) => {
  try {
    //Find the product and delete it
    let product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Not Found");
    }

    if (product.seller.toString() !== req.admin.id) {
      return res.status(401).send("Not Allowed");
    }

    product = await Products.findByIdAndDelete(req.params.id);
    res.json({ Success: "Product Deleted Successfully", product: product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 6 - Search a product using GET - "/api/product/search/:key" - no login required

router.get("/search/:key", async (req, res) => {
  try {
    const products = await Products.find({
      $or: [
        { title: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });
    res.send(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 7 - Get products category wise using GET - "/api/product/category/:key" - no login required

router.get("/category/:key", async (req, res) => {
  try {
    const products = await Products.find({
      category: { $regex: req.params.key },
    });
    res.send(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 10 - Filtering a product using GET - "/api/product/filter/:key" - no login required

router.get("/filter/:key", async (req, res) => {
  try {
    const products = await Products.find({
      $or: [
        { title: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
        { description: { $regex: req.params.key } },
      ],
    });
    res.send(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//upload image

router.post("/upImage", async (req, res) => {
  let fileName = Date.now() + "-" + req.files.testimage.name;
  let newPath = path.join(process.cwd(), "images", fileName);
  req.files.testimage.mv(newPath);

  res.send(req.files);
});

module.exports = router;

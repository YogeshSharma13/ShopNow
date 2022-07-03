const jwt = require("jsonwebtoken");
const jwt_secret = "Yogesh@boy1";

const fetchAdmin = (req, res, next) => {
  //Get user from jwt token and add id to req body
  const token = req.header("adminAuth-token");
// const token = req.header("Admintoken");
  if (!token) {
    res.status(401).send({ error: "Please authenticate yourself" });
    return;
  }

  try {
    const data = jwt.verify(token, jwt_secret);
    req.admin = data.admin;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate yourself" });
  }
};

module.exports = fetchAdmin;
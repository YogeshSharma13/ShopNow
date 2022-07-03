const jwt = require("jsonwebtoken");
const jwt_secret = "Yogesh@boy1";

const fetchUser = (req, res, next) => {
  //Get user from jwt token and add id to req body
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate yourself" });
  }

  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate yourself" });
  }
};

module.exports = fetchUser;

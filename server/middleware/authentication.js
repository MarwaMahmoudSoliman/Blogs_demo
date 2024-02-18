const jwt = require("jsonwebtoken");
const httpStatus = require("../Utils/httpStatus");
const User = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    console.log(req.cookies.access_token)
    const token = req.cookies && req.cookies.access_token && req.cookies.access_token.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ status: httpStatus.FAIL, message: "Unauthorized" });
    }
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
  
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    delete user.password;
  
   

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ status: httpStatus.ERROR, message: "Please authenticate", statusCode: 401 });
  }
};

function adminAthuorization(req, res, next) {
  if (req.user && req.user.role === "ADMIN") {
    // User is an admin, grant access
    next();
  } else {
    // User is not an admin, deny access
    res.status(403).send("Access denied.");
  }
}

module.exports = { authentication, adminAthuorization };
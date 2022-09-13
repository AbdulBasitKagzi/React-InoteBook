const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "config.env" });

// secret key to generate jsonwebtoken
const secret_key = process.env.SECRET_KEY;

const fetchuser = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    if (!token) {
      res.status(401).send("User is not logged in");
    }
    const data = jwt.verify(token, secret_key);
    // console.log("data", data.user.id);
    req.user = data.user;
    // console.log("loggedid", req.user.id);

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(400).send("Some error occured");
  }
};

module.exports = fetchuser;

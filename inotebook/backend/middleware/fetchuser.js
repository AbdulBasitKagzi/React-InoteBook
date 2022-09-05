const jwt = require("jsonwebtoken");

const secret_key = "abdulb@sit";

const fetchuser = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    if (!token) {
      res.status(401).send("User is not logged in");
    }
    const data = jwt.verify(token, secret_key);
    console.log("data", data);
    req.user = data.user;
    console.log("id", req.user);
    //   console.log(userId);
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(400).send("Some error occured");
  }
};

module.exports = fetchuser;
// setting up routes
const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config({ path: "config.env" });
// secret key to generate jsonwebtoken
const secret_key = process.env.SECRET_KEY;

// creating route
const route = express.Router();

// making routes for requests
route.get("/", (req, res) => {
  res.send("Hello AbdulBasit 😊");
});

// request to add users to database
route.post(
  "/api/auth/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // checking error for filling of user data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log("err");
      return res.status(400).json({
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }

    // console.log(req.body);

    // const user = User(req.body);
    // user.save();
    // res.send(user);

    // alternate method to add data to database
    const { name, email, password } = req.body;

    // to check if user already exists
    const userIsThere = await User.findOne(
      { email },
      { _id: 0, password: 0, name: 0, date: 0, __v: 0 }
    );
    // console.log("adfds", userIsThere);
    try {
      if (userIsThere !== null) {
        if (email === userIsThere.email) {
          return res.status(400).send("This email is already registered");
        }
      }
      // register the user if it doesnot exists

      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(password, salt);
      const user = await User.create({
        name,
        email,
        password: securePass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret_key);
      // console.log("authToken", authToken);
      return res.status(200).json(authToken);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Some error occured");
    }
  }
);

// authenticaton/login endpoint
route.post(
  "/api/auth/login",
  [
    body("email", "Enter valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password Cannot be blank").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    // catching errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log("err");
      return res.status(400).send({
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    // destructuring
    const { email, password } = req.body;
    try {
      // finding user from database
      const user = await User.findOne({ email });
      // console.log("user", user);
      if (!user) {
        return res
          .status(400)
          .send({ error: "Please login with correct credentials email" });
      }
      // console.log("user is there");

      // comparing passwords
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res
          .status(400)
          .send({ error: "Please login with correct credentials Password" });
      }
      // console.log("password is correct");
      const data = {
        user: {
          id: user.id,
        },
      };

      // creating auhtoken
      const authToken = jwt.sign(data, secret_key);
      return res.status(200).send({ success: true, token: authToken });
    } catch (error) {
      console.error(error.message);
      return res.status(400).send("Some error occured");
    }
  }
);

// to check which user is logged in
route.post("/api/auth/getuser", fetchuser, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById({ _id: id }).select("-password");
    // console.log("loggedin", user);
    return res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(400).send("Some error occured");
  }
});

module.exports = route;

// setting up routes
const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../model/UserModel");

// creating route
const route = express.Router();

// making routes for requests
route.get("/", (req, res) => {
  res.send("Hello AbdulBasit 😊");
});

// request to add users to database
route.post(
  "/api/auth",
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
      console.log("err");
      return res.status(400).json({
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }

    console.log(req.body);

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
    console.log("adfds", userIsThere);
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
      return res.status(200).send(user);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Some error occured");
    }
  }
);

module.exports = route;

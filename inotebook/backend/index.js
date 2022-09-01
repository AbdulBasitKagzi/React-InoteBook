// setting up server
const express = require("express");
const route = require("./routes/route");
const mongooseToConnect = require("./db");
const app = express();

// port number
const port = 3000;

// setting up middleware
app.use(express.json());
app.use(route);

// database connection
mongooseToConnect();

// server
app.listen(port, () => {
  console.log("Server Started");
});

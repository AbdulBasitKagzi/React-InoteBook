// setting up server
const express = require("express");
const route = require("./routes/route");
const mongooseToConnect = require("./db");
const routeNotes = require("./routes/notesRoute");
const app = express();

// port number
const port = 5000;

// setting up middleware
app.use(express.json());
app.use(route);
app.use(routeNotes);

// database connection
mongooseToConnect();

// server
app.listen(port, () => {
  console.log("Server Started");
});

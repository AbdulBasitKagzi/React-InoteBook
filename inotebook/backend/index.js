// setting up server
const express = require("express");
const cors = require("cors");
const route = require("./routes/route");
const mongooseToConnect = require("./db");
const routeNotes = require("./routes/notesRoute");
const app = express();

// port number
const port = process.env.PORT || 5000;

// setting up middleware
app.use(cors());
app.use(express.json());
app.use(route);
app.use(routeNotes);

// database connection
mongooseToConnect();

// HEROKU
if (process.env.NODE_ENV === "production") {
  app.use(express.static("inotebook/build"));
}

// server
app.listen(port, () => {
  console.log("Server Started");
});

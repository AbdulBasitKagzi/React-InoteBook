const mongoose = require("mongoose");
require("dotenv").config({ path: "config.env" });
// function to connect to monogodb compass

const db = process.env.DATABASE;
function connectToMongo() {
  mongoose
    .connect(db, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to database Successfull (●'◡'●)"))
    .catch((err) => console.log(`${err}`));
}
module.exports = connectToMongo;

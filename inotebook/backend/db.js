const mongoose = require("mongoose");

// function to connect to monogodb compass
function connectToMongo() {
  mongoose.connect("mongodb://localhost:27017/inotebook", () => {
    console.log("Connection to database Successfull (●'◡'●)");
  });
}

module.exports = connectToMongo;

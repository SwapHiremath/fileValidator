// external imports
const mongoose = require("mongoose");
async function dbConnect() {
  mongoose
    .connect("mongodb://0.0.0.0:27017/fileValidationSystem", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB!", error);
    });
}

module.exports = dbConnect;

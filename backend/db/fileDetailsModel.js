const mongoose = require("mongoose");

// user schema
const FileDetailsSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, "Please provide an Name!"],
  },
  fileData: {
    type: String,
  },
  created_on: {
    type: Date,
  },
});

// export UserSchema
module.exports =
  mongoose.model.FileDetails || mongoose.model("FileDetails", FileDetailsSchema);

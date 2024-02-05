const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const FileDetails = require("./db/fileDetailsModel");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dbConnect();

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, data) => {
    if (data) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    }
  });
});

app.post("/uploadFileData", (req, res) => {
  const { fileName, fileData } = req.body;
  FileDetails.findOne({ fileName: fileName }, (err, data) => {
    if (data) {
      res.send({ message: "File already registerd" });
    } else {
      let currentDate = new Date();
      const fileDetails = new FileDetails({
        fileName,
        fileData,
        currentDate,
      });
      fileDetails
        .save()
        .then((result) => {
          res.status(201).send({
            message: "File uploaded Successfully",
            result,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    }
  });
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});

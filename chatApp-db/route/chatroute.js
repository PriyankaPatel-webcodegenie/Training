const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const Chats = require("./../models/Chat");

const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
// res.send("Hello");
// console.log("Hello...");
// });

router.get('/', function(req, res, next) {
  console.log("in/ route")
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  connectdb.then(db => {
    console.log("Hey..DB Connected");
    let data = Chats.find({ message: "Anonymous" });
    Chats.find({}).then(chat => {
      console.log("res.json"+chat);
      res.json(chat);
      console.log("data sending...");
    });
    console.log("data send");
  });
  console.log("NOt connected..");
});

module.exports = router;

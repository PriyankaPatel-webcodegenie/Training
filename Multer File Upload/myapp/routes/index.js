var express = require('express');
var router = express.Router();
const multer  = require('multer')
var fs = require('fs');
const path = require("path");
const user_model = require('../models/user_model')
const upload = multer({ dest: "public/files" });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Express' });
});
router.post("/api/uploadFile", upload.single("myFile"), (req, res) => {
  // Stuff to be added later
  console.log(req.file);
});
module.exports = router;

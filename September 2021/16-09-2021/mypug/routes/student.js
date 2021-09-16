var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome home page of pug');
});
router.get('/', function(req, res, next) {
    res.send('Welcome about page of pug');
  });
  
module.exports = router;

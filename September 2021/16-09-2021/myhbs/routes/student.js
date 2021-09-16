var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome in student page of hbs');
});
router.get('/about', function(req, res, next) {
    res.send("student About page of hbs");
  });
module.exports = router;

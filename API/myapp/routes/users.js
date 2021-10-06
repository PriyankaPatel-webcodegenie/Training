var express = require('express');
var router = express.Router();
const user_model = require('../models/user_model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add', function(req, res, next) {
  res.render("add");
});
//add all data
router.post('/add',function(req,res,next){
  console.log(req.body);
  const mybodydata ={
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email
  }
  var data =user_model(mybodydata);
  data.save(function(err){
    if(err){
      res.send(JSON.stringify({"flag":0,"message":"Error in api ","err":err}));
    }else{
      res.send(JSON.stringify({"flag":1,"message":"record added"}));
    }
  })
});

module.exports = router;

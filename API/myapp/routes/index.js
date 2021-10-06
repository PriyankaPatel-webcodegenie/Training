var express = require('express');
const user_model = require('../models/user_model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/get',function(req,res,next){
  user_model.find({},function(err,mydata){
    if(err){
      res.send(JSON.stringify({"flag":0,"message":"Error","err":err}));
    }else{
      res.send(JSON.stringify({"flag":1,"message":"data listing","data":mydata}));
    }
  });
});
/*Get single data by id */
router.get('/get/:id',function(req,res,next){
  user_model.findById(req.params.id,function(err,mydata){
    if(err){
      res.send(JSON.stringify({"flag":0,"message":"Error","err":err}));
    }else{
      res.send(JSON.stringify({"flag":1,"message":"data listing","data":mydata}));
    }
  });
});
router.get('/test', function(req, res, next) {
  res.render("/test");
});
router.get('/add', function(req, res, next) {
  res.render("/add-users-api");
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
   //   res.send(data);
    }
  })
});

//delete data  by id
router.delete('/delete', function(req, res, next) {
  user_model.findByIdAndRemove(req.body._id,function(err,post){
    if(err){
      res.send(JSON.stringify({"flag":0,"message":"Error","err":err}));
    }else{
      res.send(JSON.stringify({"flag":1,"message":"data deleted"}));
    }
  });
});
//update data by id
router.put("/update/:id",function(req,res,next){
  console.log(req.params.id);
  user_model.findByIdAndUpdate(req.params.id,req.body,function(err,post){

    if(err){
      res.send(JSON.stringify({"flag":0,"message":"Error","err":err}));
    }else{
      res.send(JSON.stringify({"flag":1,"message":"data updated"}));
    }
  });
});

module.exports = router;

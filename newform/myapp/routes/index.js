var express = require('express');
var router = express.Router();
var userModel =require('../models/user_model');
/* GET home page. */
router.get('/', function(req, res, next) {


  userModel.find(function (err, data) {
    if (err) {
      console.log("error in fetch data");
    }
    else {
      console.log("data fetch sucessfully");
      res.render('index', { user_array: data });
    }
  }).lean()
});
router.get('/users', function(req, res, next) {


  userModel.find(function (err, data) {
    if (err) {
      console.log("error in fetch data");
    }
    else {
      console.log("data fetch sucessfully");
      res.render('partials/display', { user_array: data });
    }
  }).lean()
});
router.post('/', function (req, res, next) {
  
 var myfile = req.files.photo; 
   var myfilename = req.files.photo.name;
  // var myfilename = null;
   const mybodydata = {
     firstname:req.body.firstname,
     lastname:req.body.lastname,
     address:req.body.address,
     interest:req.body.interest,
     hobby:req.body.hobby,
     gender:req.body.gender,
     photo:myfilename
    }
    var data = userModel(mybodydata);
    data.save(function(err){
      if(err){
          console.log("Error in Insert user"+err);
      }else{
        myfile.mv("public/upload/"+myfilename,function(err){
          if(err){
            return res.status(500).send(err);
          }
            else{
              res.json(data);
            }
          console.log("file uploaded");
        });
          console.log("user Insert Successfully"+ data);
          
              //res.send('successfull'); 
              //res.json(data);
      }
  })
 });
 router.delete('/:id', function(req, res, next) {
  var deleteid = req.params.id;
  userModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.json({status:"data delete"});
   //  res.json(deleteid)
    }
  })
  res.render('index');
});
router.get('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  userModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.json(data)
    }
  }).lean();

});
router.put('/edit/:id', function(req, res, next) {
  console.log("PUT METHOD...")
  console.log("Edit" + req.params.id)
  var myfile = req.files.photo; 
   var myfilename = req.files.photo.name;
  var editid = req.params.id;
  const mybodydata = {

    firstname:req.body.firstname,
    lastname:req.body.lastname,
    address:req.body.address,
    interest:req.body.interest,
    hobby:req.body.hobby,
    gender:req.body.gender,
    photo:myfilename
  }

  userModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);
      res.json(data);
     
    }
  }).lean();

});
module.exports = router;

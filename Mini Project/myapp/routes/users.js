var express = require('express');
var router = express.Router();
var userModel =require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add', function(req, res, next) {
  res.render('admin/users/add');
});
router.post('/add', function (req, res, next) {
  var myfile = req.files.photo; 
   var myfilename = req.files.photo.name;
   const mybodydata = {
     name:req.body.name,
     gender:req.body.gender,
     email:req.body.email,
     password:req.body.password,
     address:req.body.address,
     photo:myfilename
    }
    var data = userModel(mybodydata);
    data.save(function(err){          
        if(err){
            console.log("Error in Insert"+err);
        }else{
            console.log("INsert Successfully");
          myfile.mv('public/upload/'+myfilename,function(err){
                if(err) throw err;
             res.send("User added successfully");
            });
           }
 });
 });
 router.get('/userdisplay', function (req, res, next) {
  userModel.find(function (err, data) {
    if (err) {
      console.log("error in fetch data");
    }
    else {
      console.log("data fetch sucessfully");
      res.render('admin/users/userdisplay', { user_array: data });
    }
  }).lean()
});
router.get('/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  userModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/admin/users/userdisplay');
    }
  })
  res.render('admin/users/userdisplay');
});


router.get('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  userModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('admin/users/userdisplay',{mydata:data})
    }
  }).lean();

});
router.post('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email :req.body.email,
    roll_no :req.body.roll_no,
    contact_number: req.body.contact_number
  }

  StudentModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/admin/user/userdisplay');
    }
  }).lean();

});

module.exports = router;

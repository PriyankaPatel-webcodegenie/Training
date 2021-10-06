var express = require('express');
var router = express.Router();

//Model Loading
var UserModel = require('../models/user_model');
var StudentModel = require('../models/student_model');
var EmpModel = require('../models/employee_model')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/users/user', function(req, res, next) {
  res.render('users/user');
});

router.post('/users/user', function(req, res, next) {
  
  const mybodydata = {
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email :req.body.email,
    contact_number: req.body.contact_number,
  //  id: parseInt(objectId.valueOf(), 16)
  }
  var data = UserModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.redirect('/users/user-display')
    }
  })
  
});
router.get('/users/user-display', function(req, res, next) {
  UserModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('users/user-display',{mydata:data});
    }
  }).lean();
});
router.get('/users/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  UserModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('users/edit',{mydata:data})
    }
  }).lean();

});
router.post('/users/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email :req.body.email,
    contact_number: req.body.contact_number
  }

  UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/users/user-display');
    }
  }).lean();

});
router.get('/users/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  UserModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/users/user-display');
    }
  })
  res.render('users/user');
});
router.get('/students/student', function(req, res, next) {
  res.render('students/student');
});

router.post('/students/student', function(req, res, next) {
  
  const mybodydata = {
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email :req.body.email,
    roll_no :req.body.roll_no,
    contact_number: req.body.contact_number
  }
  var data = StudentModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.redirect('/Students/student-display')
    }
  })
  
});
router.get('/students/student-display', function(req, res, next) {
  StudentModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('students/student-display',{mydata:data});
    }
  }).lean();
});
router.get('/students/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  StudentModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/Students/student-display');
    }
  })
  res.render('students/student');
});

router.get('/students/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  StudentModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('students/edit',{mydata:data})
    }
  }).lean();

});
router.post('/students/edit/:id', function(req, res, next) {
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

      res.redirect('/students/student-display');
    }
  }).lean();

});

router.get('/employees/employee', function(req, res, next) {
  res.render('employees/employee');
});

router.post('/employees/employee', function(req, res, next) {
  
  const mybodydata = {
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email :req.body.email,
   company_name : req.body.company_name,
   designation :req.body.designation,
    contact_number: req.body.contact_number
  }
  var data = EmpModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.redirect('/employees/employee')
    }
  })
  
});
router.get('/employees/employee-display', function(req, res, next) {
  EmpModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('employees/employee-display',{mydata:data});
    }
  }).lean();
});
router.get('/employees/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  EmpModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/employees/employee-display');
    }
  })
  res.render('employees/employee');
});

router.get('/employees/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  EmpModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('employees/edit',{mydata:data})
    }
  }).lean();

});
router.post('/employees/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email :req.body.email,
    roll_no :req.body.roll_no,
    contact_number: req.body.contact_number
  }

  EmpModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/employees/employee-display');
    }
  }).lean();

});

module.exports = router;

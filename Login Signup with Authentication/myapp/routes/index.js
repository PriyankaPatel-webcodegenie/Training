var express = require('express');
var session = require('express-session')
const nodemailer = require("nodemailer");
const Swal = require('sweetalert');
var UserModel = require('../models/user_model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  
  const mybodydata = {
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email : req.body.email,
    gender :req.body.gender,
    password : req.body.password,
    conform_password : req.body.conform_password

  }
  var data = UserModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.redirect('signup')
    }
  })
  
});
//Login Get Method
router.get('/login', function (req, res, next) {
  res.render('login');
});

//Login Process  Method
router.post('/login', function (req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  console.log(req.body);
  UserModel.findOne({ "email":email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.email;
      var db_password = db_users_array.password;

    }

    console.log("db_users_array.email " + db_email);
    console.log("db_users_array.password " + db_password);

    if (db_email == null) {
      console.log("If");
//swal("Email not found");
    }
    else if (db_email == email && db_password == password) {
     req.session.email = db_email;
      res.redirect('/home');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});
router.get('/home', function (req, res, next) {

  console.log("Home Called " + req.session.email);
  var email = req.session.email;
  console.log(email);

  //Auth
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }
  res.render('home', { email: email });
});
//Forgot Password Get Method
router.get('/forgot-password', function (req, res, next) {
  res.render('forgot-password');
});

//Login Process  Method
router.post('/forgot-password', function (req, res, next) {

  var email = req.body.email; 
 // var password = req.body.password;
  console.log(req.body);
  UserModel.findOne({ "email": email }, function (err, db_users_array) {
 
    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.email;
      var db_password = db_users_array.password;

    }

    console.log("db_users_array.email " + db_email);
    console.log("db_users_array.password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email) {
       "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "learningtesting2021@gmail.com", // generated ethereal user
      pass: "Test@123", // generated ethereal password
    },
  });


  // setup email data with unicode symbols
  let mailOptions = {
    from: ' <learningtesting2021@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot Password", // Subject line
    text: "Hello your password is "  + db_password, // plain text body
    html: "Hello your password is "  + db_password // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end("Password Sent on your Email");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


      
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});



module.exports = router;

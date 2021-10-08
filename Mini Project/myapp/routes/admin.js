var express = require('express');
var router = express.Router();
var session = require('express-session')
var adminModel = require('../models/admin')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
    res.render('admin/account/login');
  });
router.post('/login', function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;
  
    console.log(req.body);
    adminModel.findOne({ "email":email}, function (err, db_users_array) {
  
      console.log("Find One " + db_users_array);
  
      if (db_users_array) {
        var db_email = db_users_array.email;
        var db_password = db_users_array.password;
  
      }
  
      console.log("db_users_array.eail " + db_email);
      console.log("db_users_array.password " + db_password);
  
      if (db_email == null) {
        console.log("If");
        res.end("Email not Found");
      }
      else if (db_email == email && db_password == password) {
        console.log("SUCCESS LOGIN");
        req.session.email = db_email;
        res.redirect('/admin/dashboard');
      }
      else {
        console.log("Credentials wrong");
        res.end("Login invalid");
      }
  
   
    });
  });
  router.get('/signup', function(req, res, next) {
    res.render('admin/account/signup');
  });
  router.post('/signup', function(req, res, next) {
  
    const mybodydata = {
      name: req.body.name,
      email: req.body.email,
      password : req.body.password
  
    }
    var data = adminModel(mybodydata);
  
    data.save(function(err){
      if(err){
        console.log("Error in Add Record" + err);
      }else{
        console.log("Record Added");
        res.redirect('signup')
      }
    })
    
  });
  router.get('/forgotpassword', function(req, res, next) {
    res.render('admin/account/forgotpassword');
  });

  router.post('/forgotpassword', function (req, res, next) {

    var email = req.body.email; 
   // var password = req.body.password;
    console.log(req.body);
    adminModel.findOne({ "email": email }, function (err, db_users_array) {
   
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
  router.get('/dashboard', function(req, res, next) {
    res.render('admin/account/dashboard');
  });
  router.get('/display', function(req, res, next) {

    adminModel.find(function(err,data){
      if(err){
        console.log("Error in Fetch Data" + err);
      }else{
        console.log("Record Data is " + data);
        res.render('admin/account/display',{mydata:data});
      }
    }).lean();

  });
 
router.get('/changepassword', function (req, res, next) {

   if (!req.session.email) {
     console.log("Email Session is Set");
     res.redirect('/admin/login');
  }

  res.render('admin/account/changepassword');
});
router.post('/changepassword', function (req, res, next) {
 if (!req.session.email) {
     console.log("Email Session is Set");
     res.redirect('/admin/login');
   }
  console.log("Home Called " + req.session.email);
  var myemail = req.body.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  adminModel.findOne({ "email": myemail }, function (err, db_users_array) {

    if (err) {
      console.log("Error in Old Password Fetch " + err);
    } else {
      console.log(db_users_array);


      if (opass == db_users_array.password) {

        if (opass == npass) {
          res.end("New Password Must be Different then Old password");
        } else {

          if (npass == cpass) {

            adminModel.findOneAndUpdate({ "email": myemail }, {$set: {"password": npass}}, function (err) {
           
              if(err)
              {
                res.end("Error in Update"+err);
              }else{ 

                res.send("Password Changed");
              }
           
            });



          } else {
            res.end("New Password and Confirm Password not match");
          }

        }

      } else {
        res.end("Old Password Not Match");
      }


    }


  });



});
module.exports = router;

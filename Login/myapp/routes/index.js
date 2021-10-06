var express = require('express');
var router = express.Router();
var UsersModel = require('../models/user_model');
var session = require('express-session')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});
//Signup Page Processing
router.post('/signup', function (req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_isadmin: req.body.user_isadmin

  }
  var data = UsersModel(mybodydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in Insert Record" + err);
    } else {
      res.render('signup');
    }
  })

});



//Login Get Method
router.get('/login', function (req, res, next) {
  res.render('login');
});


//Login Process  Method
router.post('/login', function (req, res, next) {

  var email = req.body.user_email;
  var password = req.body.user_password;

  console.log(req.body);
  UsersModel.findOne({ "user_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
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

//Login Get Method
router.get('/about', function (req, res, next) {
  res.render('about');
});

module.exports = router;

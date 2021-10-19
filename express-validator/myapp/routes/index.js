var express = require('express');
var router = express.Router();
var session = require('express-session');
var user_model = require('../module/user')
const { check, validationResult }
  = require('express-validator');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/form', function (req, res, next) {
  res.render('form');
});
router.post('/form', [
  check('email').isLength({ min: 10 }).withMessage('Name must be of 10 characters long.')
    .isEmail().withMessage("Enter valid email"),
  check('name').isLength({ min: 3 }).withMessage('Name must be of 3 characters long.')
    .isAlpha().withMessage('Name must be alphabetic.')

  ,
  check('password', 'Password must be greater than 8 and contain at least one uppercase letter,one special character, one lowercase letter, and one number')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1
    }),
    check('aadhar').matches('^[2-9]{1}[0-9]{11}$').withMessage("Invalid Aadhar number"),
    check('pan_no').matches('[A-Z]{5}[0-9]{4}[A-Z]{1}').withMessage("Invalid Pan number"),
    check('gst').matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$').withMessage("Invalid GST number"),
    check('mobile').matches('^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$').withMessage("Invalid mobile number"),
   // check('mobile').matches('[6-9]{1}[0-9]{9}').withMessage("Invalid mobile number"),

  check('confirmpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
 

], (req, res, next) => {
  // const mybodydata = {
  //   email:req.body.email,
  //   password:req.body.password,
  //  }
  //  var data = user_model(mybodydata);
  //  data.save(function(err){
  //   if(err){
  //     console.log("Error in Insert"+err);
  //       }else{
  //         res.redirect('form');
  //       }
  //  })
  const errors = validationResult(req).mapped();
  if (errors) {

    // res.render('form',{name_error:errors.name.msg,email_error:errors.email.msg,password_error:errors.password.msg})
    res.render('form', { errors: errors })

  }
  else {
    res.send("Successfully validated");
  }

});

module.exports = router;

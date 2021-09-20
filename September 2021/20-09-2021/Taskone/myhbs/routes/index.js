var express = require('express');
var router = express.Router();
nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', function (req, res, next) {
  res.render('signup');
});
router.post('/signup', function (req, res, next) {
  console.log(req.body);
  var name =req.body.name;
  var email = req.body.email;
  var pwd = req.body.pwd;
  var mobile = req.body.mobile; 
  var gender = req.body.gender;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "learningtesting2021@gmail.com", // generated ethereal user
      pass: "Test@123", // generated ethereal password
    },
  });

  var emailOptions = {
    from: "learningtesting2021@gmail.com",
    to: "priyankapatel2281@gmail.com, piyappatel.001@gmail.com",
    subject: 'New User',
    html: "<table  border=1px> <tr><th> Name</th> <th> E-Mail</th> <th> Password</th> <th>Mobile </th> <th> Gender</th> </tr> <tr> <td>" + name + " </td>   <td>" + email + " </td> <td>" + pwd + " </td> <td>" + mobile + " </td> <td>" + gender + " </td></tr> </table>",
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message Sent: ' + info.response);
    }
  });

  res.render('users', { name: name, email: email, pwd: pwd, mobile: mobile, gender: gender });



});
module.exports = router;

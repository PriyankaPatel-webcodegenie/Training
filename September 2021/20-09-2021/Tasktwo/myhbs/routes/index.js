var express = require('express');
var router = express.Router();
nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Express' });
});
router.post('/form', function (req, res, next) {
  console.log(req.body);
  var email = req.body.email;
  var sub = req.body.sub;
  var body = req.body.body;
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
    from: '"Priyanka " <foo@example.com>',
    to: email,
    subject: sub,
    text: body,
   
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message Sent: ' + info.response);
      console.log('Email Message: ' + emailMessage);
    }
  });

  res.render('send', {  email: email, sub: sub, body: body });



});
module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/ans', function(req, res, next) {
  res.render('ans');
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.post('/signup', function(req, res, next) {
  console.log(req.body);
  var fname = (req.body.fname);
  var lname =(req.body.lname);
  var email =(req.body.email); 
  var cno =(req.body.cno);
  var pwd =(req.body.pwd);
  res.render('users', { fname:fname, lname:lname, email:email, cno:cno,pwd:pwd});
});
router.get('/form', function(req, res, next) {
  res.render('form');
});
router.post('/form', function(req, res, next) {
  console.log(req.body);
  var a = parseInt(req.body.n1);
  var b= parseInt(req.body.n2);
  var c = a +b;
  res.render('ans', { mya:a, myb:b, myc:c});
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res, next) {
  console.log(req.body);
  
  var email =(req.body.email); 

  res.render('logged', { email:email});
});

router.get('/marksheet', function(req, res, next) {
  res.render('marksheet');
});
router.post('/marksheet', function(req, res, next) {
  console.log(req.body);
  var maths = parseInt(req.body.maths);
  var english =parseInt(req.body.english);
  var hindi =parseInt(req.body.hindi); 
  var gujarati =parseInt(req.body.gujarati);
  var science  =parseInt(req.body.science);
  var total = maths+english+gujarati+science+hindi;
  var per = (total*100)/500;

  
  var msg="";
  if(per>40)
  {
    msg="Congratulation You are Pass....";
  }
  else
  {
    msg="You are fail";
  }
  res.render('result', { maths:maths, english:english, hindi:hindi, gujarati:gujarati,science:science,total:total,msg:msg,per:per});
});
module.exports = router;

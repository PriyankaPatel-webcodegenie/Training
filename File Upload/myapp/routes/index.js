var express = require('express');
const user_model = require('../models/user_model');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form', function (req, res, next) {
  res.render('form');
});
router.post('/form', function (req, res, next) {
 var myfile = req.files.photo; 
  var myfilename = req.files.photo.name;
  const mybodydata = {
    name:req.body.name,
    gender:req.body.gender,
    email:req.body.email,
    password:req.body.password,
    date:req.body.date,
   photo:myfilename
   }
   var data = user_model(mybodydata);
   data.save(function(err){          
       if(err){
           console.log("Error in Insert"+err);
       }else{
           console.log("INsert Successfully");
         myfile.mv('public/upload/'+myfilename,function(err){
               if(err) throw err;
               res.redirect('display');
           });
          }
});
});
router.get('/display', function (req, res, next) {
  user_model.find(function (err, data) {
    if (err) {
      console.log("error in fetch data");
    }
    else {
      console.log("data fetch sucessfully");
      res.render('display', { user_array: data });
    }
  }).lean()
});

module.exports = router;

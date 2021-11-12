var express = require('express');
var router = express.Router();
const User = require('../models/user_model');
const fileUpload = require('express-fileupload');
/* GET home page. */
 router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
 });
router.get('/user', function(req, res, next) {
  User.find(function (err, db_user_array) {   
     console.log(db_user_array);
// res.json(db_user_array);
    if (err) console.log("error")
       res.render("display", { user_array: db_user_array });

console.log({name:"priyanka",lname:"patel"})
  //res.send(result);
}).lean();
});
router.get('/404', function(req, res, next) {
  res.render('404', { title: 'Express' });
});
router.get('/display', function(req, res, next) {
  res.render('display', { title: 'Express' });
});
router.post('/', function (req, res, next) {


  try {
    
      console.log('Post a User: ' + JSON.stringify(req.body));
       var myfile = req.files.photo; 
 
      var myfilename = req.files.photo.name;
    //  var myfilename = null;
       const mybodydata = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address:req.body.address,
        interest:req.body.interest,
        gender:req.body.gender,
        photo:myfilename
    
        }
        console.log(mybodydata);
        var user = User(mybodydata);
        user.save(function(err){          
            if(err){
                console.log("Error in Insert"+err);
            }else{
              myfile.mv('public/upload/'+myfilename,function(err){
                             if(err) throw err;
                          
                         });
              
                console.log("INsert Successfully");
                // res.send("User added successfully");
                res.send({
                  type: 'success',
                  message: 'User added successfully.',

              });
            
               }
     });
    
  } catch (error) {
    console.log("error");
    console.log(error);
    res.send("there is an error");
  }
 });
module.exports = router;

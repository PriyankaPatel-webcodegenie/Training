var express = require('express');
var router = express.Router();
var userModel =require('../models/user_model');
/* GET home page. */
router.get('/', async function(req, res, next) {

  try{
    await userModel.find( function (err, data) {
      console.log("data fetch sucessfully");
      res.render('index', { user_array: data });
    
    }).lean()
  }
  catch(err){
  console.log(err)
  }

});
router.get('/users', async function(req, res, next) {
  try{
    let condition = {};
     if(req.query.search){
   // let data = userModel.find( { $text: { $search: req.query.search } } )

  

        // let find = userModel.find({$or: [{firstname: req.query.search},{lastname:req.query.search}]})
    
condition={$or: [{firstname: req.query.search},{lastname:req.query.search}]},{address:req.query.search}
      // console.log(req.query)
       // condition.firstname = req.query.search;
      // console.log("search")
      // console.log(condition.firstname)
     }
    if(req.query.formgender){
           condition.gender = req.query.formgender;
      console.log("gender is...")
      console.log(condition.gender)
    }
    console.log("hello search data is")
    console.log(condition)
    let data = await userModel.find(condition).lean()
 
    res.render('partials/display', { user_array: data });
  }
  catch(err){
   console.log(err);
  }

});
router.post('/', async function (req, res, next) {
  try{
    var myfile = req.files.photo; 
    var myfilename = req.files.photo.name;
   // var myfilename = null;
    const mybodydata = {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      address:req.body.address,
      interest:req.body.interest,
      hobby:req.body.hobby,
      gender:req.body.gender,
      photo:myfilename
     }
     var data = await userModel(mybodydata);
     data.save( function(err){
      myfile.mv("public/upload/"+myfilename,function(err){
        res.json(data);
        console.log("file uploaded");
      });
        console.log("user Insert Successfully"+ data);
        
            //res.send('successfull'); 
            //res.json(data);
   })
  }
  catch(err){
res.json(error)
  }
 
 });
 router.delete('/:id', async function(req, res, next) {
  var deleteid = req.params.id;
 await userModel.findByIdAndDelete(deleteid,function(err,data){
  console.log("Record Deleted " + deleteid);
  res.json({status:"data delete"});
  })
  res.render('index');
});
router.get('/edit/:id', async function(req, res, next) {
  var editid = req.params.id;
 await userModel.findById(editid,function(err,data){
  console.log(data);
  res.json(data)
  }).lean();

});
router.put('/edit/:id', async function(req, res, next) {
  console.log("PUT METHOD...")
  console.log("Edit" + req.params.id)
  var myfile = req.files.photo; 
   var myfilename = req.files.photo.name;
  var editid = req.params.id;
  const mybodydata = {

    firstname:req.body.firstname,
    lastname:req.body.lastname,
    address:req.body.address,
    interest:req.body.interest,
    hobby:req.body.hobby,
    gender:req.body.gender,
    photo:myfilename
  }

  await userModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    console.log( "Record Updated" +  data);
    res.json(data);
   
  }).lean();

});
// router.get('/search/:query', async function(req, res, next) {
//   var editid = req.params.id;
//  await userModel.findById(editid,function(err,data){
//   console.log(data);
//   res.json(data)
//   }).lean();

// });
module.exports = router;

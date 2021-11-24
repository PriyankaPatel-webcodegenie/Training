var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require("path");
// Multer File Upload
const multer = require('multer');
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];
  if (ext === "jpg" || ext === "jpeg" || ext === "png") {
    cb(null, true);
  } else {
    cb(new Error("Please upload proper image"));
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('photo');

// require user model
var userModel =require('../models/user_model');
const { throws } = require('assert');
/* GET form page. */
router.get('/404', function(req, res, next) {
  res.render('404');
});

router.get('/', async function(req, res, next) {
  try{
    var page=1;
    var limit=5;
    //pagination
    if(req.query.page)
      {
        page=req.query.page
        console.log("page is "+page)
      }     
    var  skip= limit*(page-1)

    var val;
    let condition = {};
    var fieldname="firstname"
    if(req.query.fieldname){
     fieldname=req.query.fieldname
      if(req.query.order=="asc")
      {
        val=1;
      }else{
       val=-1;
      }   
    }

    // searching
     if(req.query.search){
        condition["$or"]= [{firstname: req.query.search},{lastname:req.query.search},{address:req.query.search}]
     }

    // serach gender
    if(req.query.formgender){
           condition.gender = req.query.formgender;
      console.log("gender is...")
      console.log(condition.gender)
    }
    
     let data = await userModel.find(condition).lean().sort({[fieldname]: val}).skip(skip).limit(limit)
     let record  = await userModel.countDocuments(condition)
        console.log(data)  ;
       res.render('index', { 
        user_array: data ,
        pagination: {
          page: page,
          totalPage: new Int8Array(Math.ceil(record / limit)).map((curr, index) => curr = index + 1),
          url: req.originalUrl
        }});
  }
  catch(err){
   console.log(err);
   res.render('404');
  }


});

// Users display GET
router.get('/users', async function(req, res, next) {
  try{
    var page=1;
    var limit=5;
    if(req.query.page)
      {
        page=req.query.page
        console.log("page is "+page)
      }     
    var  skip= limit*(page-1)

    var val;
    let condition = {};
    var fieldname="firstname"

    //Sorting
    if(req.query.fieldname){
     fieldname=req.query.fieldname
      if(req.query.order=="asc")
      {
        val=1;
      }
      if(req.query.order=="desc")
      {
       val=-1;
      }   
    }

     if(req.query.search){
       console.log("serach regex is")
   var regex=  new RegExp(req.query.search,'i')
        condition={$or: [{firstname: regex},{lastname: new RegExp(req.query.search, "i")},{address: new RegExp(req.query.search, "i")}]}
     }

    if(req.query.formgender){
           condition.gender = req.query.formgender;
      console.log("gender is...")
      console.log(condition.gender)
    }
    
     let data = await userModel.find(condition).lean().sort({[fieldname]: val}).skip(skip).limit(limit)
     let record  = await userModel.countDocuments(condition)
        console.log(data)  ;
       res.render('partials/display', { 
         layout:'blank',
        user_array: data ,
        pagination: {
          page: page,
          totalPage: new Int8Array(Math.ceil(record / limit)).map((curr, index) => curr = index + 1),
          url: req.originalUrl
        }});
  }
  catch(err){
   console.log(err);
  }

});


//FORM POST method
router.post('/', async (req, res) => {
  // Stuff to be added later
  try{
    upload(req,res, async function(err){
      if(err){
          console.log(err)
          return res.json({
            type: 'error',
            message: err.message
          });
      }
      console.log(req.file);
    //  var myfile = req.files.photo; 
    // var myfilename = req.files.photo.name;
    // myfile.mv("public/upload/"+myfilename,async function(err){
      const mybodydata = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        address:req.body.address,
        interest:req.body.interest,
        hobby:req.body.hobby,
        gender:req.body.gender,
        photo:req.file.originalname
       } 
       var data = await userModel.create(mybodydata);
       res.json({
         type: 'success'
       });
      console.log("file uploaded");
    });

  }
  catch(err){
    console.log('err')
    console.log(err)
    //error
res.json(err)
  }
});

//Delete
 router.delete('/:id', async function(req, res, next) {
  var deleteid = req.params.id;
  try{
   let data= await userModel.deleteOne({_id:deleteid})
    console.log("Record Deleted " + deleteid);
    res.json({status:"data delete"});
  
   
    
  }
catch(err){
  console.log("error deleting record"+err);
  
}

});

//Delete GET
router.get('/edit/:id', async function(req, res, next) {
  var editid = req.params.id;
  try{
    let data= await userModel.findById(editid)
    console.log(data);
    res.json(data)
  }
  catch(err){

  }


});

//Delete put
router.put('/edit/:id', async function(req, res, next) {
  var editid = req.params.id;
  console.log("PUT METHOD...")
  console.log("Edit" + req.params.id)
  var myfile = req.files.photo; 
   var myfilename = req.files.photo.name;

  const mybodydata = {

    firstname:req.body.firstname,
    lastname:req.body.lastname,
    address:req.body.address,
    interest:req.body.interest,
    hobby:req.body.hobby,
    gender:req.body.gender,
    photo:myfilename
  }

  var data =await userModel.updateOne({_id: editid,mybodydata});
    console.log( "Record Updated" +  data);
    res.json(data);
  

});
module.exports = router;
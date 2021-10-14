var express = require('express');
var router = express.Router();
var stateModel = require('../models/state')
/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('admin/state/add');
});

  router.post('/add', function (req, res, next) {
  
     const mybodydata = {
       state_name:req.body.state_name,
     
      }
      var data = stateModel(mybodydata);
  
      data.save(function(err){
        if(err){
          console.log("Error in Add Record" + err);
        }else{
          console.log("Record Added");
          res.redirect('/admin/state/add')
        }
      })
   });
   router.get('/display', function (req, res, next) {
    stateModel.find(function (err, data) {
      if (err) {
        console.log("error in fetch data");
      }
      else {
        console.log("data fetch sucessfully");
        res.render('admin/state/display', { state_array: data });
      }
    }).lean()
  });
  router.get('/delete/:id', function(req, res, next) {
    var deleteid = req.params.id;
    stateModel.findByIdAndDelete(deleteid,function(err,data){
      if(err)
      {
        console.log("Error in Delete " + err);
      }else{
        console.log("Record Deleted " + deleteid);
        res.redirect('/admin/state/display');
      }
    })
    res.render('admin/state/display');
  });
  
//Get Single User for Edit Record by sub category
router.get('/edit/:id', function (req, res) {
  console.log(req.params.id);
  stateModel.findById(req.params.id, function (err, db_state_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_state_array);
          res.render('admin/state/edit', { state_array: db_state_array });
      }
  });
});

//Update Sub Category Record Using Post Method
router.post('/edit/:id', function (req, res) {
  console.log("Edit ID is" + req.params.id);
  const mybodydata = {
    state_name:req.body.state_name,
  }
  stateModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/state/display');
      } else {
          res.redirect('/admin/state/display');
      }
  });
});

module.exports = router;

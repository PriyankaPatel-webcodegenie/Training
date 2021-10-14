var express = require('express');
var router = express.Router();
var categoryModel = require('../models/category')
/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('admin/category/add');
});

  router.post('/add', function (req, res, next) {
  
     const mybodydata = {
       category_name:req.body.category_name,
     
      }
      var data = categoryModel(mybodydata);
  
      data.save(function(err){
        if(err){
          console.log("Error in Add Record" + err);
        }else{
          console.log("Record Added");
          res.redirect('/admin/category/add')
        }
      })
   });
   router.get('/display', function (req, res, next) {
    categoryModel.find(function (err, data) {
      if (err) {
        console.log("error in fetch data");
      }
      else {
        console.log("data fetch sucessfully");
        res.render('admin/category/display', { category_array: data });
      }
    }).lean()
  });
  router.get('/delete/:id', function(req, res, next) {
    var deleteid = req.params.id;
    categoryModel.findByIdAndDelete(deleteid,function(err,data){
      if(err)
      {
        console.log("Error in Delete " + err);
      }else{
        console.log("Record Deleted " + deleteid);
        res.redirect('/admin/category/display');
      }
    })
    res.render('admin/category/display');
  });
  router.get('/edit/:id', function (req, res) {
    console.log(req.params.id);
    categoryModel.findById(req.params.id, function (err, db_category_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_category_array);
            res.render('admin/category/edit', { category_array: db_category_array });
        }
    });
});

//Update Sub Category Record Using Post Method
router.post('/edit/:id', function (req, res) {
  
    console.log("Edit ID is" + req.params.id);
    const mybodydata = {
      category_name:req.body.category_name,
    }
    categoryModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/category/display');
        } else {
            res.redirect('/admin/category/display');
        }
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();

var cityModel = require('../models/city');
var stateModel = require('../models/state');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//Add Subcategory by get method
router.get('/add', function(req, res, next) {
    stateModel.find(function(err, db_state_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_state_array);
            //Render User Array in HTML Table
            res.render('admin/city/add',{state_array : db_state_array}); 
          }
      }).lean();
  //res.render('add-category');
});

//Add Sub Category using Post Method 
router.post('/add', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      city_name: req.body.city_name,
    _state: req.body._state
      }

  var data = cityModel(mybodydata);

  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.redirect('/admin/city/add');
      }
  })
});

//display sub category data
router.get('/display', function(req, res, next) {
   cityModel.find(function(err, db_city_array){
        console.log(db_city_array);

    if(err) res.json({message: 'There are no posts here.'});

    cityModel.find({}).lean()
    .populate('_state')
  
      .exec(function(err, db_city_array) {

        console.log(db_city_array);
     
        res.render("admin/city/display", { city_array: db_city_array });
      })
  }).lean()
   
});
//Delete User By ID
router.get('/delete/:id', function(req, res) {
    cityModel.findByIdAndDelete(req.params.id, function(err, project) {
        if (err) {
          console.log("Error in Record Delete " + err);
            res.redirect('/admin/city/display');
        } else {

          console.log(" Record Deleted ");
            res.redirect('/admin/city/display');
        }
    });
});

//Get Single User for Edit Record by sub category
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    cityModel.findById(req.params.id, function(err, db_city_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_city_array);
            res.render('admin/city/edit',{city_array: db_city_array});
        }
    });
});

//Update Sub Category Record Using Post Method
router.post('/edit/:id', function(req, res) {
    console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
      city_name: req.body.city_name,
      _state: req.body._state
    }
    cityModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/city/display');
        } else {
            res.redirect('/admin/city/display');
        }
    });
  });
  

module.exports = router;


var express = require('express');
var router = express.Router();

//Call User Database Model
var stateModel = require('../models/state');
var cityModel = require('../models/city');
var areaModel = require('../models/area');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//Add product by get method
router.get('/add', function (req, res, next) {
    stateModel.find(function (err, db_state_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
        } else {
            cityModel.find(function (err, db_city_array) {
                if (err) {
                    console.log("Error in Fetch Data " + err);
                } else {
                    //Print Data in Console
                    console.log(db_city_array);
                    //Render User Array in HTML Table
                    res.render('admin/area/add', {city_array: db_city_array, state_array: db_state_array });
                }
            }).lean();
            //Print Data in Console

        }
    }).lean();

    //res.render('add-category');
});


router.post('/add', function (req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
        area_name: req.body.area_name,
        _state: req.body._state,
        _city: req.body._city
    }


    var data = areaModel(mybodydata);

    data.save(function (err) {
        if (err) {
            console.log("Error in Insert Record");
        } else {
         
                res.redirect('/admin/city/add');
  
        }
        
    })
});

//display sub category data
router.get('/display', function (req, res, next) {
    areaModel.find(function (err, db_area_array) {
        console.log(db_area_array);

        if (err) res.json({ message: 'There are no posts here.' });

        areaModel.find({}).lean()
            .populate('_state _city')

            .exec(function (err, db_area_array) {

                console.log(db_area_array);

                res.render("admin/area/display", { area_array: db_area_array });
            })
    }).lean()

});

//Get Single User By ID in sub category show
// router.get('/show/:id', function(req, res) {
//     console.log(req.params.id);

//     SubCategoryModel.findById(req.params.id, function(err, db_sucategory_array) {


//         if (err) {
//             console.log("Error in Single Record Fetch" + err);
//         } else {


//             console.log(db_sucategory_array);

//             res.render('subcategory/single-subcategory-record', { subcategory_array: db_sucategory_array });
//         }
//     });
//   });

//Delete User By ID
router.get('/delete/:id', function (req, res) {
    areaModel.findByIdAndDelete(req.params.id, function (err, project) {
        if (err) {
            console.log("Error in Record Delete " + err);
            res.redirect('/admin/area/display');
        } else {

            console.log(" Record Deleted ");
            res.redirect('/admin/area/display');
        }
    });
});

//Get Single User for Edit Record by sub category
router.get('/edit/:id', function (req, res) {
    console.log(req.params.id);
    areaModel.findById(req.params.id, function (err, db_area_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_area_array);
            res.render('admin/area/edit', { area_array: db_area_array });
        }
    });
});

//Update Sub Category Record Using Post Method
router.post('/edit/:id', function (req, res) {
    console.log("Edit ID is" + req.params.id);
    const mybodydata = {
        area_name: req.body.area_name,
        _state: req.body._state,
        _city: req.body._city
    }
    areaModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/city/display');
        } else {
            res.redirect('/admin/area/display');
        }
    });
});


module.exports = router;


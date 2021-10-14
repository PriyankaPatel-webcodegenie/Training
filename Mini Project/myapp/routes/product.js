var express = require('express');
var router = express.Router();

//Call User Database Model
var subcategoryModel = require('../models/subcategory');
var categoryModel = require('../models/category');
var productModel = require('../models/product')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//Add product by get method
router.get('/add', function (req, res, next) {
    categoryModel.find(function (err, db_category_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
        } else {
            subcategoryModel.find(function (err, db_subcategory_array) {
                if (err) {
                    console.log("Error in Fetch Data " + err);
                } else {
                    //Print Data in Console
                    console.log(db_subcategory_array);
                    //Render User Array in HTML Table
                    res.render('admin/product/add', { subcategory_array: db_subcategory_array, category_array: db_category_array });
                }
            }).lean();
            //Print Data in Console

        }
    }).lean();

    //res.render('add-category');
});

//Add Sub Category using Post Method 
router.post('/add', function (req, res, next) {
    var myfile = req.files.product_image;
    var myfilename = req.files.product_image.name;
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
        product_name: req.body.product_name,
        product_details: req.body.product_details,
        product_price: req.body.product_price,
        product_image: myfilename,
        _category: req.body._category,
        _subcategory: req.body._subcategory
    }


    var data = productModel(mybodydata);

    data.save(function (err) {
        if (err) {
            console.log("Error in Insert Record");
        } else {
            myfile.mv('public/product/' + myfilename, function (err) {
                if (err) throw err;
                res.redirect('/admin/product/add');
            });

        }
    })
});

//display sub category data
router.get('/display', function (req, res, next) {
    productModel.find(function (err, db_product_array) {
        console.log(db_product_array);

        if (err) res.json({ message: 'There are no posts here.' });

        productModel.find({}).lean()
            .populate('_category _subcategory')

            .exec(function (err, db_product_array) {

                console.log(db_product_array);

                res.render("admin/product/display", { product_array: db_product_array });
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
    productModel.findByIdAndDelete(req.params.id, function (err, project) {
        if (err) {
            console.log("Error in Record Delete " + err);
            res.redirect('/admin/product/display');
        } else {

            console.log(" Record Deleted ");
            res.redirect('/admin/product/display');
        }
    });
});

//Get Single User for Edit Record by sub category
router.get('/edit/:id', function (req, res) {
    console.log(req.params.id);
    productModel.findById(req.params.id, function (err, db_product_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_product_array);
            res.render('admin/product/edit', { product_array: db_product_array });
        }
    });
});

//Update Sub Category Record Using Post Method
router.post('/edit/:id', function (req, res) {
    var myfile = req.files.product_image;
    var myfilename = req.files.product_image.name;
    console.log("Edit ID is" + req.params.id);
    const mybodydata = {
        product_name: req.body.product_name,
        product_details :req.body.product_details,
        product_price: req.body.product_price,
        product_image: myfilename,
        _subcategory: req.body.subcategory_name,
        _category: req.body._category
    }
    productModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/product/display');
        } else {
            res.redirect('/admin/product/display');
        }
    });
});


module.exports = router;


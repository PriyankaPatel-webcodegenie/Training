var express = require('express');
var router = express.Router();
var UserModel = require('../models/user_model');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function (req, res, next) {
  res.render('add', { title: 'Express' });
});
router.post('/add', function (req, res, next) {

  const mybodydata = {
    user_name: req.body.name,
    user_mobile: req.body.mobile,
    user_email: req.body.email
  }
  var data = UserModel(mybodydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in Add Record" + err);
    } else {
      console.log("Record Added");
      res.redirect('add')
    }
  })

});
router.get('/display', function (req, res, next) {
  UserModel.find(function (err, data) {
    if (err) {
      console.log("Error in Fetch Data" + err);
    } else {
      console.log("Record Data is " + data);
      res.render('display', { mydata: data });
    }
  }).lean();
});
router.get('/delete/:id', function (req, res, next) {

  let msg = confirm("Are you sure want to delete?");
  alert(msg);
  if (msg)
  {
    var deleteid = req.params.id;
    UserModel.findByIdAndDelete(deleteid, function (err, data) {
      if (err) {
        console.log("Error in Delete " + err);
      } else {
  
        console.log("Record Deleted " + deleteid);
        res.send("Record deleted");
        res.redirect('display');
      }
    })
    res.render('display');
  }
   
});

router.get('/edit/:id', function (req, res, next) {
  var editid = req.params.id;
  UserModel.findById(editid, function (err, data) {
    if (err) {
      console.log("Error in Edit" + err)
    } else {
      console.log(data);
      res.render('edit', { mydata: data })
    }
  }).lean();

});

router.post('/edit/:id', function (req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    user_name: req.body.txt1,
    user_mobile: req.body.txt2
  }

  UserModel.findByIdAndUpdate(editid, mybodydata, function (err, data) {
    if (err) {
      console.log("Error in Edit" + err)
    } else {
      console.log("Record Updated" + data);

      res.redirect('display');
    }
  }).lean();

});

module.exports = router;

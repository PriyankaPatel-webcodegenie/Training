var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
 fname :String,
 lname : String,
 email : String
});

module.exports = mongoose.model('apiuser',myschema);

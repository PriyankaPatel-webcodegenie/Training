var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    name : String,
    email: String,
    password : String
   

});

module.exports = mongoose.model('admin',myschema);

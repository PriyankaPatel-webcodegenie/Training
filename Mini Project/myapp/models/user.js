var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    name:String,
    gender:String,
    email:String,
    password:String,
    address:String,
    photo:String

});

module.exports = mongoose.model('users',myschema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    first_name : String,
    last_name : String, 
    email : String,
    gender :String,
    password : String,
    conform_password :String

});

module.exports = mongoose.model('members',myschema);

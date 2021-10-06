var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    first_name : String,
    last_name : String,
    email : String,
    roll_no :Number,
    contact_number : String

});

module.exports = mongoose.model('student',myschema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    first_name : String,
    last_name : String,
    email : String,
   company_name :String,
   designation : String,
    contact_number : String

});

module.exports = mongoose.model('employee',myschema);

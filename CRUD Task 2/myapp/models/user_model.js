var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    id :Number,
    first_name : String,
    last_name : String,
    email : String,
    contact_number : String

});

module.exports = mongoose.model('user1',myschema);

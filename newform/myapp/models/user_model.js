var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    firstname:String,
    lastname:String,
    address:String,
    hobby:[{type:String}],
    interest:String,
    gender:String,
    photo:String

});

module.exports = mongoose.model('newform',myschema);
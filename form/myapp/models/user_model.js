const mongoose = require('mongoose');
 
const UserSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    address:String,
    interest:String,
    gender:String,
    photo:String,

});
 
module.exports = mongoose.model('newform', UserSchema);

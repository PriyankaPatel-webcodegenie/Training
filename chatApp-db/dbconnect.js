
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

		
const url = "mongodb://mydb1:mydb1@localhost:27017/mydb1";

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;
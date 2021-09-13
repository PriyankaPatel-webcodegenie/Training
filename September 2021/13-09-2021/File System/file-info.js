var fs = require('fs'); //Get File Information using stats 
fs.stat('file.txt', function (err, stats) {
    if (err) {
        return console.error(err);
    } //Check File Information 
    console.log(stats);
    // Check file type 
    console.log("isFile ? " + stats.isFile()); console.log("isDirectory ? " + stats.isDirectory());
});
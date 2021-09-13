var fs = require('fs');
fs.unlink('hell.txt',function(err){
    if(err)
        throw err;
    console.log("file deleted sucessfully");
});
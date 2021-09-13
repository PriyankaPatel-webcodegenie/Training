var fs = require('fs');
fs.appendFile('hell.txt',"Welcome",function(err){
    if(err) 
        throw err;
    console.log("File appeended successfully");
});
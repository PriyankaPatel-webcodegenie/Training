var fs = require('fs');
fs.rename('hello.txt', 'file.txt', function (err) { 
    if (err) 
        throw err; 
    console.log('File Renamed!'); 
});
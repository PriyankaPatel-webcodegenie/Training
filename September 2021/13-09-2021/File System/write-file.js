var fs = require('fs');
fs.writeFile('hello.txt', "Hello World", function (er) {
    if (er) throw er;
})
console.log("File created successfully..");
// Will give error  code: 'ERR_INVALID_CALLBACK'

//  fs.writeFile('hello.txt',"New data");
fs.writeFileSync('hello.txt', "New data");
var http = require('http');
http.createServer(function(req,resp){
    resp.end("HELLO WORLDr");
}).listen(8081);
console.log("Server started at 127.0.0.1:8081");
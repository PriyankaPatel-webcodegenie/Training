var http = require('http');
http.createServer(function(req,resp)
{
   resp.writeHead(200,{'content-Type':'text/plain'});
    resp.end("hello");

}).listen(8081);

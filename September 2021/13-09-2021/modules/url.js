var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2021&month=septemer';
var q = url.parse(adr, true);
console.log(q.host); 
console.log(q.pathname);
console.log(q.search);

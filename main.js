var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var db = require('./lib/db');
var login = require('./lib/login');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        login.login(request, response);
      } else {

      }
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);

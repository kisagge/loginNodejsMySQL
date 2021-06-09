var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var db = require('./lib/db');

var tweet = require('./lib/tweet');
var login = require('./lib/login');
const signup = require('./lib/signup');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        tweet.index(request, response);
      } else {
        tweet.page(request, response);
      }
    } else if(pathname === '/login'){
      login.login(request, response);
    } else if(pathname === '/login_process'){
      login.login_process(request, response);
    } else if(pathname === '/login_failure'){
      login.login_failure(request, response);
    } else if(pathname === '/signup'){
      signup.signup(request, response);
    } else if(pathname === '/signup_process'){
      signup.signup_process(request, response);
    } else if(pathname === '/signup_failure'){
      signup.signup_failure(request, response);
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);

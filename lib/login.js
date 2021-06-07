var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');

exports.login = function(requset, response){
  var title = "Log In";
  var description = "Please log in for using tweet";
  var html = template.HTML(title, ``,
  `<h2>${title}</h2>${description}`,
  ``);
  response.writeHead(200);
  response.end(html);
}

exports.login_process = function(request, response){

}

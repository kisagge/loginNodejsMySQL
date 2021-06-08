var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');

exports.index = function(request, response){
  var title = "MINI TWEETER";
  var html = template.HTML(sanitizeHtml(title), ``,
  `<h2>${title}</h2>
  <form action="/login" method="POST">
    <br>
    <button type="submit">Go to Log In</button>
  </form>
  <form action="/signup" method="POST">
    <br>
    <button type="submit">Go to Sign Up</button>
  </form>`,
  ``);
  response.writeHead(200);
  response.end(html);
}

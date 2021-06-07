var db = require('./db');
var template = require('./template');
var url = require('url');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');

exports.home = function(request, response){
  db.query('SELECT * FROM member', function(error, members){
    if(error){
      throw error;
    }
    var title = "Member List";
    //var list = template.list(members);
    var html = template.HTML(title, '',
    ``,``);
    response.writeHead(200);
    response.end(html);
  });
}

exports.login = function(request, response){

}

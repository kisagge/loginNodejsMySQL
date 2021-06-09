const db = require('./db');
const template = require('./template.js');
const url = require('url');
const qs = require('querystring');
const sanitizeHtml = require('sanitize-html');

exports.login = function(requset, response){
  var title = "Log In";
  var html = template.HTML(sanitizeHtml(title), ``,
  `<h1><a href="/">MINI TWEETER</a></h1>
  <h2>${title}</h2>
  <form action="/login_process" method="POST">
    <input id="member_id" name="id" type="text" placeholder="ID">
    <br>
    <input id="password" name="password" type="password" placeholder="Password">
    <br>
    <button type="submit">Log in</button>
  </form>`,
  ``);
  response.writeHead(200);
  response.end(html);
}

exports.login_process = function(request, response){
  var body = ``;
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    db.query(`SELECT * FROM member WHERE id=?`, [post.id],
    function(error, result){
      if(result.length === 0){
        response.writeHead(302, {Location: `/login_failure`});
        response.end();
      } else {
        db.query(`SELECT * FROM member WHERE id=? AND password=?`, [post.id, post.password],
        function(error2, result2){
          if(error2){
            throw error2;
          }
          if(result2.length === 0){
            response.writeHead(302, {Location: `/login_failure`});
            response.end();
          } else {
            response.writeHead(302, {Location: `/?id=${post.id}`});
            response.end();
          }
        });
      }
    });
  });
}

exports.login_failure = function(requset, response){
  var title = "Log In Failure!";
  var description = "Please re log in!";
  var html = template.HTML(sanitizeHtml(title), ``,
  `<h1><a href="/">MINI TWEETER</a></h1>
  <h2>${title}</h2>
  ${description}
  <form action="/login" method="POST">
    <br>
    <button type="submit">Back to Log In</button>
  </form>`,
  ``);
  response.writeHead(200);
  response.end(html);
}

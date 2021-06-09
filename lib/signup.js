const db = require('./db');
const template = require('./template.js');
const url = require('url');
const qs = require('querystring');
const sanitizeHtml = require('sanitize-html');

exports.signup = function(request, response){
  var title = "Sign Up";
  var html = template.HTML(sanitizeHtml(title), ``,
  `<h1><a href="/">MINI TWEETER</a></h1>
  <h2>${title}</h2>
  <form action="/signup_process" method="POST">
    <input id="member_id" name="member_id" type="text" placeholder="ID">
    <br>
    <input id="password" name="password" type="password" placeholder="Password">
    <br>
    <input id="name" name="name" type="text" placeholder="Name">
    <br>
    <input id="email" name="email" type="email" placeholder="E-mail">
    <br>
    <button type="submit">Sign Up</button>
  </form>`,
  ``);
  response.writeHead(200);
  response.end(html);
}

exports.signup_process = function(request, response){
  var body = ``;
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    db.query(`SELECT * FROM member WHERE id=?`, [post.member_id],
    function(error, result){
      if(result.length === 0){
        db.query('INSERT INTO member VALUES(?, ?, ?, ?)',
        [post.member_id, post.password, post.name, post.email],
        function(error2, result2){
          if(error2){
            throw error2;
          }
          response.writeHead(302, {Location: `/`});
          response.end();
        });
      } else {
        response.writeHead(302, {Location: `/signup_failure`});
        response.end();
      }
    });
  });
}

exports.signup_failure = function(requset, response){
  var title = "Sign Up Failure!";
  var html = template.HTML(sanitizeHtml(title), ``,
  `<h1><a href="/">MINI TWEETER</a></h1>
  <h2>${title}</h2>
  <form action="/signup" method="POST">
    <br>
    <button type="submit">Back to Sign Up</button>
  </form>`,
  ``);
  response.writeHead(200);
  response.end(html);
}

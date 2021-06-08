var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');

exports.login = function(requset, response){
  var title = "Log In";
  var html = template.HTML(sanitizeHtml(title), ``,
  `<h2>${title}</h2>
  <form action="/login_process" method="POST">
    <input id="member_id" name="member_id" type="text" placeholder="ID">
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
    db.query(`SELECT * FROM member WHERE id=?`, [post.member_id],
    function(error, result){
      if(result.length === 0){
        response.writeHead(302, {Location: `/login_failure`});
        response.end();
      } else {
        db.query(`SELECT * FROM member WHERE id=? AND password=?`, [post.member_id, post.password],
        function(error2, result2){
          if(result2.length === 0){
            response.writeHead(302, {Location: `/login_failure`});
            response.end();
          } else {
            console.log(post);
            response.writeHead(302, {Location: `/`});
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
  `<h2>${title}</h2>
  ${description}
  <form action="/login" method="POST">
    <br>
    <button type="submit">Back to Log In</button>
  </form>`,
  ``);
  response.writeHead(200);
  response.end(html);
}

exports.signup = function(request, response){
  var title = "Sign Up";
  var html = template.HTML(sanitizeHtml(title), ``,
  `<h2>${title}</h2>
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
  `<h2>${title}</h2>
  <form action="/signup" method="POST">
    <br>
    <button type="submit">Back to Sign Up</button>
  </form>`,
  ``);
  response.writeHead(200);
  response.end(html);
}

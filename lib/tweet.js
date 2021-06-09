const db = require('./db');
const template = require('./template.js');
const url = require('url');
const qs = require('querystring');
const sanitizeHtml = require('sanitize-html');

exports.index = function(request, response){
  var title = "MINI TWEETER";
  var html = template.HTML(sanitizeHtml(title), ``,
  `<h1><a href="/">MINI TWEETER</a></h1>
  <h2>${title}</h2>
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

exports.page = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM member WHERE id=?`, [queryData.id], function(error, members){
    db.query(`(SELECT * FROM tweet WHERE member_id=?) UNION (select * from tweet where member_id=(select followed_id from follow WHERE following_id=?)) ORDER BY date DESC;`,
    [queryData.id, queryData.id], function(error2, tweets){
      if(error2){
        throw error2;
      }
      var title = `Hello, ${sanitizeHtml(members[0].id)}`;
      var html = template.HTML(sanitizeHtml(title), ``,
      `<h1><a href="/?id=${sanitizeHtml(members[0].id)}">MINI TWEETER</a></h1>
      <h2>${title}</h2>
      <p>Name: ${sanitizeHtml(members[0].name)}</p>
      <p>Email: ${sanitizeHtml(members[0].email)}</p>
      ${template.tweetlist(tweets)}
      <form action="/" method="POST">
        <br>
        <button type="submit">Log out</button>
      </form>`,
      ``);
      response.writeHead(200);
      response.end(html);
    });
  });
}

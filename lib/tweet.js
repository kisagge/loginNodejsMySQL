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
    db.query(`((SELECT * FROM tweet WHERE member_id=?) UNION (SELECT id, content, member_id, date FROM tweet JOIN (SELECT * FROM follow where following_id=?) AS F ON tweet.member_id=F.followed_id)) ORDER BY date DESC`,
    [queryData.id, queryData.id], function(error2, tweets){
      if(error2){
        throw error2;
      }
      db.query(`select id, name from member join (select * from follow where following_id=?) as A on member.id=A.followed_id`, [queryData.id], function(error3, followers){
        if(error3){
          throw error3;
        }
        db.query(`select A.id, A.name from (select id, name from member) A left join (select id, name from member join (select * from follow where following_id=?) as B on member.id=B.followed_id) C on A.id=C.id where C.id is null and A.id!=?;`
        , [queryData.id, queryData.id], function(error4, unfollowers){
          var title = `Hello, ${sanitizeHtml(queryData.id)}`;
          var html = template.HTML(sanitizeHtml(title), ``,
          `<h1><a href="/?id=${sanitizeHtml(queryData.id)}">MINI TWEETER</a></h1>
          <h2>${title}</h2>
          <p>Name: ${sanitizeHtml(members[0].name)}</p>
          <p>Email: ${sanitizeHtml(members[0].email)}</p>
          ${template.tweetlist(tweets, queryData.id)}
          <form action="/create" method="POST" style="display:inline">
            <input type="hidden" name="id" value="${queryData.id}"></button>
            <input type="submit" value="Create tweet"></button>
          </form>
          <form action="/" method="POST" style="display:inline">
            <button type="submit">Log out</button>
          </form>
          ${template.memberTable(followers, unfollowers, queryData.id)}`,
          ``);
          response.writeHead(200);
          response.end(html);
        });
      });
    });
  });
}

exports.create = function(request, response){
  var body='';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var title = `Please create tweet, ${sanitizeHtml(post.id)}`;
    var html = template.HTML(sanitizeHtml(title), ``,
    `<h1><a href="/?id=${sanitizeHtml(post.id)}">MINI TWEETER</a></h1>
    <h2>${title}</h2>
    <form action="/create_process" method="POST">
      <p><textarea name="content" placeholder="Please input tweet"></textarea></p>
      <p><input type="hidden" name="id" value="${post.id}"></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `,``);
    response.writeHead(200);
    response.end(html);
  });
}

exports.create_process = function(request, response){
  var body='';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    db.query(`INSERT INTO tweet(content, member_id, date) VALUES(?, ?, NOW())`, [post.content, post.id],
    function(error, result){
      if(error){
        throw error;
      }
      response.writeHead(302, {Location: `/?id=${post.id}`});
      response.end();
    });
  });
}

exports.update = function(request, response){
  var body='';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var title = `Please update tweet, ${sanitizeHtml(post.id)}`;
    var html = template.HTML(sanitizeHtml(title), ``,
    `
    <h1><a href="/?id=${sanitizeHtml(post.id)}">MINI TWEETER</a></h1>
    <h2>${title}</h2>
    <form action="/update_process" method="POST">
      <input type="hidden" name="id" value="${post.id}">
      <input type="hidden" name="past_content" value="${post.content}">
      <p><textarea name="content" placeholder="Please input tweet">${sanitizeHtml(post.content)}</textarea></p>
      <p><input type="submit" value="Update"></p>
    </form>
    `,``);
    response.writeHead(200);
    response.end(html);
  });
}

exports.update_process = function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      db.query('UPDATE tweet SET content=?, date=NOW() WHERE content=? AND member_id=?', [post.content, post.past_content, post.id], function(error, result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location: `/?id=${post.id}`});
        response.end();
      })
    });
}

exports.delete = function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      db.query('DELETE FROM tweet WHERE content=? AND member_id=?', [post.content, post.id], function(error, result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location: `/?id=${post.id}`});
        response.end();
      })
    });
}

exports.follow_process = function(request, response){
  var body='';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    db.query(`INSERT INTO follow VALUES(?, ?)`, [post.id, post.followed_id], function(error, result){
      if(error){
        throw error;
      }
      response.writeHead(302, {Location: `/?id=${post.id}`});
      response.end();
    });
  });
}

exports.unfollow_process = function(request, response){
  var body='';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    db.query(`DELETE FROM follow WHERE following_id=? AND followed_id=?`, [post.id, post.followed_id], function(error, result){
      if(error){
        throw error;
      }
      response.writeHead(302, {Location: `/?id=${post.id}`});
      response.end();
    });
  });
}

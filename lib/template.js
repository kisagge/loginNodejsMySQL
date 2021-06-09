var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>Mini tweeter - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  }, tweetlist:function(tweets){
    var list = '<ul>';
    var i = 0;
    while(i < tweets.length){
      list = list + `${tweets[i].member_id}<li>${sanitizeHtml(tweets[i].content)}</li><br>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
};

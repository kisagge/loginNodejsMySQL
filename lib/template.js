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
      <h1><a href="/">MINI TWEETER</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  }, list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${sanitizeHtml(topics[i].title)}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
};

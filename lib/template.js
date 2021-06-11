const db = require('./db');
const sanitizeHtml = require('sanitize-html');

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
  }, tweetlist:function(tweets, id){
    var list = '<ul>';
    var i = 0;
    while(i < tweets.length){
      list += `<li>${sanitizeHtml(tweets[i].content)} by ${tweets[i].member_id}`;
      if(id === tweets[i].member_id){
        list += `
        <form action="/update" method="POST" style="display:inline">
          <input type="hidden" name="content" value="${sanitizeHtml(tweets[i].content)}">
          <input type="hidden" name="id" value="${sanitizeHtml(tweets[i].member_id)}">
          <input type="submit" value="Update">
        </form>
        <form action="/delete_process" method="POST" style="display:inline">
          <input type="hidden" name="content" value="${sanitizeHtml(tweets[i].content)}">
          <input type="hidden" name="id" value="${sanitizeHtml(tweets[i].member_id)}">
          <input type="submit" value="Delete">
        </form>`;
      }
      list += `</li><br>`;
      i = i + 1;
    }
    list += '</ul>';
    return list;
  }, memberTable:function(followers, unfollowers, id){
    var tag = '<h3>Followers</h3><table>';
    for(var i=0; i<followers.length; i++){
      tag += `
      <tr>
        <td>${followers[i].id}</td>
        <td>${followers[i].name}</td>
        <td>
          <form action="/unfollow_process" method="post" style="display:inline">
            <input type="hidden" name="id" value="${id}">
            <input type="hidden" name="followed_id" value="${followers[i].id}">
            <input type="submit" value="Unfollow">
          </form>
        </td>
      </tr>`;
    }
    tag += `</table><h3>Unfollowers</h3><table>`;
    for(var i=0; i<unfollowers.length; i++){
      tag += `
      <tr>
        <td>${unfollowers[i].id}</td>
        <td>${unfollowers[i].name}</td>
        <td>
          <form action="/follow_process" method="post" style="display:inline">
            <input type="hidden" name="id" value="${id}">
            <input type="hidden" name="followed_id" value="${unfollowers[i].id}">
            <input type="submit" value="Follow">
          </form>
        </td>
      </tr>`;
    }
    tag +='</table>';
    return tag;
  }
};

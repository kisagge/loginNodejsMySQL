var mysql = require('mysql');
var db = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'codename1',
  database  : 'nodejsmysql'
});
db.connect();
module.exports = db;

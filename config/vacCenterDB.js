const mysql = require("mysql");

var connection = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '4e88e1b5',
    database : 'vacCenter'
});

module.exports = connection;
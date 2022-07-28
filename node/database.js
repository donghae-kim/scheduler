const mysql = require("mysql2/promise");

exports.pool = mysql.createPool({
    host: "www.kimdonghae.shop",
    user: "dummy-client",
    port: "3306",
    password: "3588",
    database:"MyTodoDB"
});
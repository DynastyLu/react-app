const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "169.254.19.26",
    port: "3306",
    user: "root",
    password: "123321",
    database: "userdata"
})
connection.connect();
module.exports = connection;

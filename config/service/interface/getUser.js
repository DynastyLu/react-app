/*
 * @Author: lxc 
 * @Date: 2019-04-01 16:28:52 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-01 20:07:12
 */

let mysql = require("../mysql/configSql.js")
let sql = 'select * from userlist';
module.exports = function (app) {
    app.get("/getUser", (req, res) => {
        mysql.query(sql, (err, rows) => {
        
            res.send({
                code: 0,
                data: rows
            })
        })
    })
}
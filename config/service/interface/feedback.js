/*
 * @Author: lxc 
 * @Date: 2019-04-01 16:28:47 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-01 21:16:52
 */

const fs = require('fs')
let mysql = require("../mysql/configSql.js")

module.exports = function (app) {
    app.get("/feedback", (req, res) => {
        var { id, values } = req.query
        console.log(id, values)
        let sql = `insert into feedback(address,user_id) values('${values}','${id}')`;
        mysql.query(sql, (err, rows) => {
            res.send({
                code: 0
            })
        })
    })
}
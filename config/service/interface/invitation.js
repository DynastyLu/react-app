/*
 * @Author: lxc 
 * @Date: 2019-04-01 16:28:58 
 * @Last Modified by:   lxc 
 * @Last Modified time: 2019-04-01 16:28:58 
 */

const fs = require('fs')
let mysql = require("../mysql/configSql.js")

module.exports = function (app) {
    app.get("/invitation", (req, res) => {
        let { name, list, address, telePhone, people, userId } = req.query
        let sql = `insert into invitation(name,address,phone,list,user_name,id) values('${name}','${address}','${telePhone}','${list}','${people}','${userId}')`;
        mysql.query(sql, (err, rows) => {
            res.send({
                code: 0
            })
        })
    })
    app.get("/getInvitation", (req, res) => {
        let { userId } = req.query
        let sql1 = `select * from invitation`;
        let sql = `select * from invitation where id=${userId}`;
        mysql.query(sql1, (err, rows) => {
            if (rows.length != 0) {
                res.send({
                    code: 0,
                    data: rows
                })
            } else {
                res.send({
                    code: 1,
                    data: err
                })
            }
        })
    })
}
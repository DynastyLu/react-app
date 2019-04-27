/*
 * @Author: zhaopengpeng 
 * @Date: 2019-04-01 16:46:58 
 * @Last Modified by: zhaopengpeng
 * @Last Modified time: 2019-04-01 18:57:01
 */
let mysql = require("../mysql/configSql.js");

module.exports = function (app) {
    app.get('/getUpLoad', (req, res) => {
        let sql2 = "select * from resume";
        mysql.query(sql2, function (err, result, field) {
            if (err) {
                try {
                    throw new Error()
                } catch (error) {
                    res.json({
                        code: 0,
                        msg: "获取失败",
                        data:[]
                    })
                }
            } else {
                res.json({
                    code: 1,
                    msg:"获取成功",
                    data:result
                })
            }
        })
    })
}
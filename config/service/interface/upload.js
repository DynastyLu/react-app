/*
 * @Author: zhaopengpeng 
 * @Date: 2019-03-31 19:50:00 
 * @Last Modified by: zhaopengpeng
 * @Last Modified time: 2019-04-01 19:55:11
 */
let mysql = require("../mysql/configSql.js")
const multiparty = require('connect-multiparty')()

const fs = require("fs")
const paths = require("path")

module.exports = function (app) {
    app.post('/upload', multiparty, (req, res) => {
        // 解构
        let { path } = req.files.file;
        //读取文件
        const flow = fs.readFileSync(path);
        // 查找路径
        const urls = paths.join(process.cwd(), `static/${req.files.file.name}`);
        // 路径
        let urlResume = "static/"+req.files.file.name
        //写入问件
        fs.writeFileSync(urls, flow);
        // 判断结果
        let sql1 = `insert into resume (id,url,name) values ('${req.files.file.size}','${urlResume}','${req.files.file.name}')`;
        mysql.query(sql1, function (err, result, field) {
            if (err) {
                try {
                    throw new Error()
                } catch (error) {
                    res.json({
                        code: 0,
                        msg: "上传失败"
                    })
                }
            } else {
                res.json({
                    code: 1,
                    msg: "上传成功"
                })
            }
        })
    })
}

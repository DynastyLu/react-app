/*
 * @Author: lxc 
 * @Date: 2019-04-01 16:28:37 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-02 10:02:00
 */

const fs = require('fs')
let mysql = require("../mysql/configSql.js")
var multipart = require('connect-multiparty');
const paths = require("path")
let mul = multipart()

module.exports = function (app) {

    app.post("/setImg", mul, (req, res) => {

        let imgUrl = req.files.file.path

        let { path } = req.files.file;

        const urls = paths.join(process.cwd(), `static/${req.files.file.name}`);

        fs.readFile(imgUrl, 'utf8', function (err, data) {

            fs.writeFile(urls, data, 'utf8', function (err) {

                if (err) {
                    console.log('文件写入错误，错误是：' + err);
                } else {
                    console.log('ok');
                }
            });

        });

        let id = req.url.split("?")[1].split("=")[1]
        var sql = `INSERT INTO getimage(id, imgUrl) VALUES('${id}', '${imgUrl}')`
        mysql.query(sql, (err, rows) => {
            res.send({
                code: 0
            })
        })
    })
}
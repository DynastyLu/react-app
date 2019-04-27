let mysql = require("../mysql/configSql.js")
let md5 = require("md5")
let sql = 'select * from userlist';
module.exports = function (app) {
    app.get("/user/login", (req, res) => {
        let { user, pwd } = JSON.parse(req.query.data);
        mysql.query(sql, (err, rows) => {
            if (err) throw new Error();
            let newObj = {}
            rows.forEach(obj => {
                if (obj.user == user) {
                    newObj.user = true
                    if (obj.pwd !== pwd) {
                        newObj.pwd = true
                    } else {
                        newObj.success = obj
                    }
                }

            })
            if (newObj.success) {
                let token = md5(JSON.stringify({
                    user: user,
                    time: new Date().getTime(),
                    userId: newObj.success.id
                }))
                let sql1 = `update userlist set token ='${token}' where  id='${newObj.success.id}'`;
                mysql.query(sql1, (err) => {
                    if(!err){
                        res.json({
                            code: 0,
                            token,
                            msg: "登陆成功"
                        })
                    }                                                              
                })

            } else if (newObj.user === undefined) {
                res.json({
                    code: 1,
                    msg: "用户名输入有误"
                })
            } else if (newObj.pwd) {
                res.json({
                    code: 1,
                    msg: "密码输入有误"
                })
            }
        })
    })

}
let mysql = require("../mysql/configSql.js")
let sql = 'select * from userlist';
module.exports = function (app) {
    //获取用户信息
    app.get("/getUserInfor", (req, res) => {
        let sql = `select * from userlist where token='${req.headers.authorization}'`;
        mysql.query(sql, (err, rows) => {
            console.log(rows, 99);
            if (rows[0].type === "student") {
                res.json({
                    code: 0,
                    data: ["邀约面试", "面试打卡", "面试反馈", "上传简历", "编辑简历", "查看简历"]
                })
            } else {
                res.json({
                    code: 0,
                    data: ["添加用户", "邀约面试", "面试打卡", "面试反馈", "上传简历", "编辑简历", "查看简历", "试题分类", "创建试题", "管理试题", "添加班级"]
                })
            }
        })
    })
}
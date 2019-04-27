/*
 * @Author: 樊轩 
 * @Date: 2019-03-30 09:29:58 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-02 10:11:26
 */
let mysql = require("../mysql/configSql.js")
let sql = 'select * from grade';
module.exports = function (app) {
    //获取班级数据
    app.get("/getGrade", (req, res) => {
        mysql.query(sql, (err, results) => {
            if (err) {
                try {
                    throw new Error()
                } catch (error) {
                    res.json({
                        code: 0,
                        msg: "教室查找失败"
                    })
                }
            } else {
                res.json({
                    code: 1,
                    data: results
                })
            }
        })
    })
    //添加教室号
    app.get("/addGrade", (req, res) => {
        let { room_id } = req.query
        let str = "1234567890qwertyuiopasdfghjklzxcvbnm";
        let id ="";
        for (let i = 0; i < 5; i++) {
            id += str[ Math.ceil(Math.random()*str.length)]
        }
        let sql2 = `insert into grade (grade_id, grade_name, room_id, subject_id) values ('${id}', '1609b', '${room_id}', 'js');`
        mysql.query(sql2, (err, results) => {
            console.log(results)
            if (err) {
                try {
                    throw new Error()
                } catch (error) {
                    res.json({
                        code: 0,
                        msg: "添加失败"
                    })
                }
            } else {
                console.log(results)
                if (results.length !== 0) {
                    res.json({
                        code: 1,
                        msg: "添加成功"
                    })
                }
            }
        })
    })
    //删除班级
    app.get("/deleteGrade", (req, res) => {
        let { id } = req.query
        let sql3 = `delete from grade where room_id=${id}`
        console.log(id,9999)
        mysql.query(sql3, (err, results) => {
            if (err) {
                try {
                    throw new Error()
                } catch (error) {
                    res.json({
                        code: 0,
                        msg: "删除失败"
                    })
                }
            } else {
                console.log(results)
                if (results.length !== 0) {
                    res.json({
                        code: 1,
                        msg: "删除成功",
                        data: results
                    })
                }
            }
        })
    })
    
}
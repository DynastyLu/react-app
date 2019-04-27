let mysql = require("../mysql/configSql.js")
let md5 = require("md5")
module.exports = function (app) {
    //添加班级数据
    app.get("/addUser", (req, res) => {
        let {userName,userPwd,indetify,defaultGrade}=JSON.parse(req.query.data);
        console.log(userName,userPwd,indetify,defaultGrade,"adduser")
        let str="1234567890qwertyuiopasdfghjklzxcvbnm";
        let id="";
        for(let i=0;i<5;i++){
            id+=str[Math.ceil(Math.random()*str.length)]
        }
        let token = md5(JSON.stringify({
            user: userName,
            time: new Date().getTime(),
            userId: id
        }))
        let sql = `insert into userlist(id, user, pwd,token,type, grade) values('${id}','${userName}','${userPwd}','${token}','${indetify}','${defaultGrade}')`;
        let select=`SELECT * FROM userlist WHERE user='${userName}';`
        mysql.query(select,(err,rows)=>{
            if(rows.length===0){                
                mysql.query(sql, (err, results) => {
                    if(!err){
                        res.json({
                            code:0,
                            msg:"添加成功"
                        })
                    }else{
                        res.json({
                            code:1,
                            msg:"添加失败"
                        })
                    }
                    
                    })
            }else{
                res.json({
                    code:2,
                    msg:"用户已存在"
                })
            }
        })
     
    })
}
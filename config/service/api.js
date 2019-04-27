let login = require("./interface/login.js")
let grade = require("./interface/grade.js")
let upload = require("./interface/upload.js")
let addUser = require("./interface/addUser.js")
let userInfor = require("./interface/userInfor.js")
let getUploadList = require("./interface/uploadinfo.js")
let feedback = require("./interface/feedback.js")
let getUser = require("./interface/getUser")
let invitation = require("./interface/invitation")
let setImgae = require("./interface/setImgae")

module.exports = function (app) {
    login(app)
    grade(app)
    addUser(app)
    userInfor(app)
    upload(app)
    getUploadList(app)

    feedback(app)
    getUser(app)
    invitation(app)
    setImgae(app)
}
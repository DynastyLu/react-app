/*
 * @Author: xuwei 
 * @Date: 2019-04-01 16:48:31 
 * @Last Modified by: xuwei
 * @Last Modified time: 2019-04-01 17:08:05
 */

import Login from "../container/login";
import Home from "../container/home";
import Room from "../container/room";
import Feedback from "../container/feedback";
import Invitation from "../container/invitation";
import Punch from "../container/punch";
import AddUser from "../container/addUser";

import Resume from "../container/addresume";
import EditResume from "../container/editresume";
import Lookresume from "../container/lookresume";
import ExamClass from "../container/examClass";
import CreateExam from "../container/createExam";
import ExamManger from "../container/examManger";
const groups = {
    QUESTIONSMANGER:{
        groupName:'试题管理',groupIcon:'user'
    },
    USERMANGER:{
        groupName:'用户管理',groupIcon:'user'
    },
    INTERVIEWMANGER:{
        groupName:'面试管理',groupIcon:'user'
    },
    GRADEMANGER:{
        groupName:'班级管理',groupIcon:'user'
    },
   RESUMEMANGER:{
        groupName:'简历管理',groupIcon:'user'
    }
}

const Routes = [{
    path: "/home",
    component: Home,
    title:"首页",
    children: [{
        path: "/home/room",
        title:"添加班级",
        groupName:groups.GRADEMANGER.groupName,
        component: Room
    }, {
        path: "/home/feedback",
        title:"面试反馈",
        groupName:groups.INTERVIEWMANGER.groupName,
        component: Feedback,
    }, {
        path: "/home/invitation",
        title:"邀约面试",
        groupName:groups.INTERVIEWMANGER.groupName,
        component: Invitation,
    }, {
        path: "/home/punch",
        groupName:groups.INTERVIEWMANGER.groupName,
        title:"面试打卡",
        component: Punch,
    }, {
        path: "/home/addUser",
        groupName:groups.USERMANGER.groupName,
        title:"添加用户",
        component: AddUser
    }, {
        path: "/home/addresume",
        title:"上传简历",
        groupName:groups.RESUMEMANGER.groupName,
        component: Resume
    }, {
        path: "/home/editresume",
        title:"编辑简历",
        groupName:groups.RESUMEMANGER.groupName,
        component: EditResume
    }, {
        path: "/home/lookresume",
        title:"查看简历",
        groupName:groups.RESUMEMANGER.groupName,
        component: Lookresume
    },{
        path: "/home/examClass",
        title:"试题分类",
        groupName:groups.QUESTIONSMANGER.groupName,
        component: ExamClass
    },{
        path: "/home/createExam",
        title:"创建试题",
        groupName:groups.QUESTIONSMANGER.groupName,
        component: CreateExam
    },{
        path: "/home/examManger",
        title:"管理试题",
        groupName:groups.QUESTIONSMANGER.groupName,
        component: ExamManger
    }]
}, {
    path: "/login",
    title:"登录",
    component: Login
}]


export default Routes;
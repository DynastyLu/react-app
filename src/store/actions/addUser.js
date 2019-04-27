/*
 * @Author: xuwei 
 * @Date: 2019-04-01 16:25:26 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-01 21:15:25
 */

import { getGrade,addUser } from "../../services/userManger";
import {message} from "antd"
export function update(payload) {
    return function(dispatch) {
        return getGrade().then((result) => {
            return dispatch({
                type: "update",
                payload: result.data.data
            })
        })
    }
}

export function add(payload) {
     return function(dispatch) {
        return addUser(payload).then(res=>{
            if(res.data.code===0){
                message.success(res.data.msg) 
            }else{
                message.error(res.data.msg)   
            }       
                 
        })     
    }
}
/*
 * @Author: xuwei 
 * @Date: 2019-04-01 16:26:08 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-01 21:15:34
 */

let defaultState={
  gradeList:[]
}
let addUserReducer=(state=defaultState,action)=>{
  let {type,payload}=action;
  switch(type){
      case "update":
      return state={...state,gradeList:[...payload]}
      default:
      return state
  }
 
}

export default addUserReducer;

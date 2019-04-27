
let defaultState={
    userInforList:[]
  }
  let userInforReducer=(state=defaultState,action)=>{
    let {type,payload}=action;
    switch(type){
        case "getData":
        return state={...state,userInforList:[...payload]}
        default:
        return state
    }
   
  }
  
  export default userInforReducer;
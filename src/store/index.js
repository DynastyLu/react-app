
import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import userInfor from "./reducer/userInfor";
import addUser from "./reducer/addUser";
let combine=combineReducers({
    addUser,
    userInfor
})

export const store = createStore(combine, applyMiddleware(thunk));
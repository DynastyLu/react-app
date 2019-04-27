/*
 * @Author: zhaopengpeng 
 * @Date: 2019-03-31 21:48:48 
 * @Last Modified by: zhaopengpeng
 * @Last Modified time: 2019-04-01 08:39:54
 */

let defaultState = {
    UploaData: []
}
let uploadReducer = (state = defaultState, action) => {
    let { type, payload } = action;
    switch (type) {
        case "UPLOAD":
            return {
                ...state,
                UploaData: { ...payload }
            }
        default:
            return state
    }

}

export default uploadReducer;
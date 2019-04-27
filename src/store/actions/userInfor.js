/*
 * @Author: xuwei 
 * @Date: 2019-04-01 16:25:56 
 * @Last Modified by: xuwei
 * @Last Modified time: 2019-04-01 19:02:23
 */

import { getUserInfor} from "../../services/userManger";

export function userInfor(payload) {
    return function(dispatch) {
        return getUserInfor().then((result) => {
            return dispatch({
                type: "getData",
                payload:result.data.data
            })
        })
    }
}


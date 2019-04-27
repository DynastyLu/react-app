import axios from "../utils/request"

//抓取数据
export function GetupLoad() {
	return axios.get('/getUpLoad',{
        params:"true"
    })
}
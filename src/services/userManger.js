import axios from "../utils/request"

//登录
export function userLogin(data) {
	return axios.get('/user/login', {
		params: {
			data
		}
	})
}
//添加用户
export function addUser(data) {
	return axios.get('/addUser', {
		params: {
			data
		}
	})
}

//获取班级
export function getGrade() {
	return axios.get('/getGrade')
}

//获取用户信息
export function getUserInfor() {
	return axios.get('/getUserInfor')
}
// 获取用户
export function getUser() {
	return axios.get('/getUser')
}

// 反馈
export function setFeedback(data) {
	console.log(data)
	let { id, values } = data
	return axios.get('/feedback', {
		params: {
			id: id,
			values: values
		}
	})
}

// 邀约面试
export function setInvitation(data) {
	console.log(data)
	let { name, list, address, telePhone, people, userId } = data
	return axios.get('/invitation', {
		params: {
			name: name,
			list: list,
			address: address,
			telePhone: telePhone,
			people: people,
			userId: userId
		}
	})
}

// 获取邀约面试
export function getInvitation(data) {
	console.log(data)
	let { userId } = data
	return axios.get('/getInvitation', {
		params: {
			userId: userId
		}
	})
}

// 上传打卡图片
export function setImg(data) {
	return axios.post('/setImg')
}

// 上传打卡图片id
export function setImgUrl(data) {
	console.log(data)
	let { userId } = data
	return axios.get('/setImgUrl', {
		params: {
			userId: userId
		}
	})
}
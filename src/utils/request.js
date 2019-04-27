/*
 * @Author: xuwei 
 * @Date: 2019-04-01 16:28:03 
 * @Last Modified by: xuwei
 * @Last Modified time: 2019-04-01 16:32:42
 */


import { getSession } from './session';
import {message} from 'antd';
import axios from "axios";
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    // 201: '新建或修改数据成功。',
    // 202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    304: '已经执行了GET，但文件未变化',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    402: '参数失败',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};
    //请求拦截
    axios.defaults.crossDomain=true;
    axios.defaults.withCredentials=true;
    axios.defaults.headers.post['Content-Type']='application/json;charset=utf-8';
    axios.interceptors.request.use(config=>{
        let token=getSession("token")
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    })
    //配置响应拦截器
    axios.interceptors.response.use(
        response => {
         // response.status === 200 ? message.success(codeMessage[200]) :  message.success('返回数据失败')
          return Promise.resolve(response);
        },
        error => {
          //不同的状态码显示不同的消息
          if (error.response) {
              message.error(codeMessage[error.response.status])
          }
          return Promise.reject(error)
})

export default axios;
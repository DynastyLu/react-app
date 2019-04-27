/*
 * @Author: zhaopengpeng 
 * @Date: 2019-03-30 08:35:12 
 * @Last Modified by: zhaopengpeng
 * @Last Modified time: 2019-04-01 19:13:31
 */
import React, { Component } from 'react'

import { GetupLoad } from "../../services/upLoad"
import { message } from 'antd';
import "./index.css"


export default class LookResume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }
    render() {
        let { dataList } = this.state;
        console.log(dataList)
        return (
            <div className="ResumesBox">
                {
                    dataList.length && dataList.map((item, index) => {
                        return <dl key={item.id}>
                            <dt className="pics">
                                <img src={require("../../common/image/resumes2.png")} alt="" />
                            </dt>
                            <dd>{item.name}</dd>
                        </dl>
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        GetupLoad().then(res => {
            let { code, data, msg } = res.data;
            if (code == 1) {
                message.success(msg);
                this.setState({
                    dataList: data
                })
            } else {
                message.error(msg);
            }
        })
    }
}

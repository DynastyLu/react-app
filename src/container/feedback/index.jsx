import React, { Component } from 'react'
import { Input, Button, message } from 'antd';
import "./index.css"
import { setFeedback, getUser } from '../../services/userManger';
import { getSession } from "../../utils/session"
const { TextArea } = Input;

export default class Feedback extends Component {
    constructor() {
        super()
        this.state = {
            values: "",
            userId: ""
        }
        this.btn = this.btn.bind(this)
    }
    btn() {
        const { userId, values } = this.state

        let username = getSession("username")
        if (values.trim().length === 0) {
            message.warning('请输入您要反馈的内容！');
            return false
        } else {
            getUser().then((res) => {
                let user = res.data.data.filter(res => {
                    return username == res.user
                })
                console.log(user)
                user.map(res => {
                    console.log(res.id)
                    this.setState({
                        userId: res.id
                    })
                })
            })

            setFeedback({
                id: userId,
                values: values
            }).then((result) => {
                if (result.data.code === 0) {
                    message.success('反馈成功！');
                }
            })
            this.refs.content.innerHTML = this.state.values
        }
    }
    render() {
        return (
            <div>
                <p>反馈内容：</p>
                <div ref="content">

                </div>
                <TextArea rows={4} onChange={(e) => {
                    console.log(e.target.value)
                    this.setState({
                        values: e.target.value
                    })
                }} />
                <p className="submission">
                    <Button onClick={this.btn} type="primary">提交</Button>
                </p>
            </div>
        )
    }
}

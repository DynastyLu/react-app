import React, { Component } from 'react'
import { setSession } from "../../utils/session"
import { userLogin } from "../../services/userManger"
import "./index.css"
import {
	Form, Icon, Input, Button, Checkbox, message
} from 'antd';
class NormalLoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);

				const { password, remember, userName } = values

				userLogin({
					user: userName,
					pwd: password
				}).then(res => {
					console.log(res.data)
					if (res.data.code === 0) {
						setSession("token", res.data.token)
						this.props.history.push("/home")
						setSession("username", userName)

					} else {
						message.error(res.data.msg)
					}
				})

			} else {
				console.log('error submit!!');
				return false;
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
		<div className="login-box">
		<h5>登录</h5>
				<Form onSubmit={this.handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>记住密码</Checkbox>
					)}
					<Button type="primary" htmlType="submit" className="login-form-button">
						登录
            </Button>
				</Form.Item>
			</Form>
		</div>
		);
	}
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;

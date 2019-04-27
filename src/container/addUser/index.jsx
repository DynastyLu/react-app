/*
 * @Author: xuwei 
 * @Date: 2019-04-01 16:26:34 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-01 21:19:39
 */
import React, { Component } from 'react'
import { connect } from "react-redux";
import { update,add} from "store/actions/addUser"
import "./index.css"
import {
  Form, Input, Select, Button,message
} from 'antd';
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    userName: "",
    userPwd: "",
    indetify: "student",
    defaultGrade: "",
    show:false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  componentDidMount() {
    this.props.Update();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    if(value===this.state.userPwd){
      this.setState({ confirmDirty: true});
    }else{
      this.setState({ confirmDirty: false});
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  submit() {
    let {confirmDirty,userName,userPwd,indetify,defaultGrade,show} = this.state;
    let reg=/^[a-zA-Z][a-zA-Z0-9]{5,12}$/
    let flag=reg.test(userName)
   if(!flag&&userName!==""){
      message.error("用户名不符合要求")
    }else if(show){
      console.log(show,defaultGrade)
     if(defaultGrade===""){
      message.error("填写信息不完全")
     }else{
        this.props.addUser({
          userName,userPwd,indetify,defaultGrade
      })
     
     }
    }else{
      this.props.addUser({
        userName,userPwd,indetify,defaultGrade
    })
    }
    
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { gradeList } = this.props;
    const { defaultGrade,show} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className="box">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={(
              <span>
                用户名
            </span>
            )}
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input onChange={(e) => {
                let userName= e.target.value
                let reg=/^[a-zA-Z][a-zA-Z0-9]{5,12}$/
                if(reg.test(userName)){
                    this.setState({
                    userName: e.target.value
                  })
                }
               
              }} placeholder="字母加数字6-12位"/>
            )}
          </Form.Item>
          <Form.Item
            label="密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" onChange={(e) => {
                this.setState({
                  userPwd: e.target.value
                })
              }} />
            )}
          </Form.Item>
          <Form.Item
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>
          <Form.Item
            label="身份"
          >
            <Select defaultValue="管理员" style={{ width: 120 }} onChange={(e) => {
              this.setState({
                indetify: e
              },()=>{
                if(this.state.indetify==="student"){
                  this.setState({
                    show:true
                  })
                }
              })
            }}>
              <Option value="student" key="student">学生</Option>
              <Option value="manger" key="manger">管理员</Option>
            </Select>
          </Form.Item>
         {
           show? <Form.Item
            label="班级"
          >
            <Select defaultValue={defaultGrade} style={{ width: 120 }} onChange={(e) => {
              this.setState({
                defaultGrade: e
              })
            }}>
              {
                gradeList.length && gradeList.map((ele,index) => {
                  const val=ele.grade_name;
                  return <Option value={val} key={ele.grade_id}>{ele.grade_name}</Option>
                })
              }
            </Select>
          </Form.Item>:null
         }

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={() => {
              this.submit()
            }}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
let stateToProps = (state) => {
  return state.addUser;
}
const mapDispatchToProps = (dispatch) => {
  return {
    Update(payload) {
      dispatch(update(payload))
    },
    addUser(payload) {
      dispatch(add(payload))
    }
  }
}
export default connect(stateToProps, mapDispatchToProps)(WrappedRegistrationForm);

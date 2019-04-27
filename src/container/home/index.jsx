/*
 * @Author: luxuchun 
 * @Date: 2019-04-01 16:48:55 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-02 10:12:34
 */
import React, { Component } from 'react'
import {
	Layout, Menu, Icon,Button
} from 'antd';
import { connect } from "react-redux";
import RouterView from "../../router"
import { NavLink } from "react-router-dom"
import {clearSession} from "utils/session"
import {userInfor} from "store/actions/userInfor"
import routes from "router/routes"
import "./index.css"


const {
	Content, Sider,
} = Layout;

const SubMenu = Menu.SubMenu;

class index extends Component {
	state = {
		collapsed: false,
		data:{}
	};

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}
	handleSubmit(){
		clearSession()
        this.props.history.push("/login")
	}
	componentDidMount(){
		this.props.Update()
	}
	componentWillReceiveProps(nextProps){
		let {userInforList}=nextProps;	
		let data={};
		routes[0].children.forEach((ele,index)=>{
			for(let i=0;i<userInforList.length;i++){
				if(userInforList[i]===ele.title){
					if(data[ele.groupName]===undefined){
						data[ele.groupName]=[]
					}
					data[ele.groupName].push(ele)
				}
			}
		})
	this.setState({
		data:{...data}
	})
	}
	render() {
		let {data}=this.state;
		let keys=Object.keys(data);
		let values=Object.values(data)
		return (
			<div className="home">
				<header>
					<p>
						学生管理系统
					</p>
					<div className="right">
						<Button className="loginBtn" type="primary" onClick={()=>{
							this.handleSubmit()
						}}>退出登录</Button>
					</div>
				</header>			
			<div className="home-layout">
			<Layout style={{ height:'100%' }}>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<div className="logo" />
					<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					{
						keys.length&&keys.map((ele,index)=>{
							return 	<SubMenu
							key={index}
							title={<span><Icon type="user" /><span>{ele}</span></span>}
						>
						{
							values[index].length&&values[index].map((item,i)=>{
								return <Menu.Item key={item.title}><NavLink to={item.path}>{item.title}</NavLink></Menu.Item>
							})
						}					
						</SubMenu>
						})
					}					
					</Menu>
				</Sider>
				<Layout>				
					<Content style={{ margin: '16px' }}>					
						<div style={{ padding: 24, background: '#fff', height:'100%' }}>
							<RouterView routes={this.props.routes} />
						</div>
					</Content>				
				</Layout>
			</Layout>
			</div>
			</div>
		);
	}
}
let stateToProps = (state) => {
	return state.userInfor;
  }
const mapDispatchToProps = (dispatch) => {
	return {
	  Update(payload) {
			dispatch(userInfor(payload))
	  },
	 
	}
  }
  export default connect(stateToProps, mapDispatchToProps)(index);
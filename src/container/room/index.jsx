/*
 * @Author: 樊轩 
 * @Date: 2019-03-29 20:29:31 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-02 10:12:44
 */
import React, { Component } from 'react'
import { Table, Button, Input, Modal,message} from 'antd';
import axios from "axios"
import style from "./index.css"
const { Column } = Table;

export default class index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			classRoomList: [],
			count: "",
			visible: false
		}
	}

	componentDidMount() {
		axios.get("/getGrade").then(res => {
          
            this.setState({
                classRoomList: res.data.data
            })
        })
	}

	showModal = () => {
		this.setState({
			visible: true,
        });
	}

	handleOk = (e) => {
        console.log(e);
        let { count } = this.state
		this.setState({
			visible: false,
        });
        axios.get("/addGrade",{
            params: {
                room_id: count
              }
		}).then(res => {
			console.log(res)
		})
		axios.get("/getGrade").then(res => {
          
            this.setState({
                classRoomList: res.data.data
            })
        })
	}

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}

	render() {
		const { classRoomList } = this.state
		return (
			<div className={style.bot}>
				<h1>考试管理/教室管理</h1>
				<div >
					<Button onClick={this.showModal} type="primary"> + 添加教室 </Button>
					<Table dataSource={classRoomList} rowKey="grade_name">
						<Column
							title="教室号"
							dataIndex="room_id"
							key="grade_name"
						/>
						<Column
							title="操作"
							dataIndex="room_id"
							key="room_id"
							render={(text, record) => (
								<span  onClick={() => {
										console.log(text,8888)
										axios.get("/deleteGrade",{
											params: {
												id: text
											  }
										}).then(res => {
											message.success(res.data.msg)
											axios.get("/getGrade").then(res => {
												console.log(res.data.data)
												this.setState({
													classRoomList: res.data.data
												})
											})
										})
									}}>
									删除
								</span>
							)}
						/>
					</Table>
				</div>
				<Modal
					title="*教室号："
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Input placeholder="教室号" onChange={(e) => {
						this.setState({
							count: e.target.value
						})
					}} />
				</Modal>
			</div>
		)
	}
}

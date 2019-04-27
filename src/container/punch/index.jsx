/*
 * @Author: lxc 
 * @Date: 2019-04-01 16:28:31 
 * @Last Modified by: lxc
 * @Last Modified time: 2019-04-02 10:07:53
 */

import React, { Component } from 'react'
import { Upload, Icon, Modal, Button, message } from 'antd';
import { getSession } from "../../utils/session"
import { setImg, getUser, setImgUrl } from "../../services/userManger"
import "./index.css"


class Punch extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        console.log(file, "foles")
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        console.log(fileList, 88888)
        this.setState({ fileList })
    }

    componentDidMount() {
        let username = getSession("username");

        getUser().then((res) => {
            let user = res.data.data.filter(res => {
                return username == res.user
            })
            user.map(res => {
                this.setState({
                    userId: res.id
                })
            })
        })
    }

    render() {
        const { previewVisible, previewImage, fileList, userId } = this.state;
        let url = "/setImg?userId=" + userId;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={url}
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    className="upload"
                >
                    {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Button type="primary" onClick={() => {
                    console.log(this.state.fileList)
                    this.state.fileList.map(item => {
                        console.log(item.name)
                        if (item.name === "xxx.png") {
                            message.error('打卡失败');
                        } else {
                            message.success('打卡成功');
                        }
                    })
                }}>打卡</Button>
            </div>
        );
    }
}

export default Punch
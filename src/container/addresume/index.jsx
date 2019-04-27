/*
 * @Author: zhaopengpeng 
 * @Date: 2019-03-30 08:35:01 
 * @Last Modified by: zhaopengpeng
 * @Last Modified time: 2019-04-01 20:09:33
 */
import React, { Component } from 'react'
import { Upload } from 'element-react';
import 'element-theme-default';
import { message } from 'antd';
import './index.css'

class AddResume extends Component {
    render() {
        return (
            <div className="resumeBox">
                <h1>上传简历</h1>
                <div className="resume_childBox">
                    <div className="lefts">
                        <img src={require("../../common/image/resume.png")} alt="" />
                    </div>
                    <div className="rigs">
                        <div className="sps">
                            <Upload
                                className="upload-demo"
                                drag
                                action="/upload"
                                multiple
                                onSuccess={this.onSuccess}
                                onPreview={this.onPreview}
                                beforeUpload={this.beforeUpload}
                                tip={<div className="el-upload__tip">可以上传任何类型的文件!!</div>}
                            >
                                <i className="el-icon-upload"></i>
                                <div className="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            </Upload>
                        </div>
                        <p>点击上传</p>
                    </div>
                </div>
            </div>
        )
    }
    //在上传之前判断上传格式
    beforeUpload = (file) => {
        if (file.type != "application/msword" && file.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            message.error("格式不正确,必须为.doc或.docx格式的");
            
            return false;
        }
    }
    //上传成功
    onSuccess = (response, file) => {
        if (response.code == 1) {
            message.success(response.msg);
        }
    }
    //点击上传之后的链接
    onPreview = (e) => {
        this.props.history.push("/home/lookresume")
    }
}

export default AddResume;

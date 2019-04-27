/*
 * @Author: lxc 
 * @Date: 2019-04-01 16:28:18 
 * @Last Modified by:   lxc 
 * @Last Modified time: 2019-04-01 16:28:18 
 */

import React, { Component } from 'react'

import { Drawer, List, Avatar, Divider, Col, Row, Input, Button, message, Table } from 'antd';
import "./index.css"

import { setInvitation, getUser, getInvitation } from "../../services/userManger"
import { getSession } from "../../utils/session"

const { TextArea } = Input;
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Address',
    dataIndex: 'address',
}, {
    title: 'ID',
    dataIndex: 'id',
}, {
    title: 'Phone',
    dataIndex: 'phone',
}, {
    title: 'List',
    dataIndex: 'list',
}];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
      </p>
        {content}
    </div>
);

export default class Invitation extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            list: "",
            address: "",
            telePhone: "",
            people: "",
            userId: "",
            dataSources: [],
            columns: []
        }
    }
    state = { visible: false };

    componentDidMount() {
        let { userId } = this.state;
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

    showDrawerNew = () => {
        let { name, list, address, telePhone, people, userId } = this.state;

        getInvitation({
            userId: userId
        }).then(res => {
            console.log(res.data.data)
            this.setState({
                dataSources: res.data.data,
                columns: res.data.data
            })
        })
        this.setState({
            visible: true,
        });
    }

    showDrawer = () => {
        let { name, list, address, telePhone, people, userId } = this.state;

        if (name === "" || list === "" || address === "" || telePhone === "" || people === "") {
            message.warning('请确认已经输入完毕!');
            return false
        } else {
            setInvitation({
                name: name,
                list: list,
                address: address,
                telePhone: telePhone,
                people: people,
                userId: userId
            }).then(res => {
                if (res.data.code === 0) {
                    message.success('提交成功！');
                }
            })
        }
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <List
                    dataSource={[
                        {
                            name: 'Lily',
                        }
                    ]}
                    bordered
                    renderItem={item => (
                        <List.Item key={item.id} actions={[<a onClick={this.showDrawer}>提交</a>, <a onClick={this.showDrawerNew}>查看</a>]}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                                }
                                title={<Input size="large" placeholder="请输入公司名" onChange={(e) => {
                                    this.setState({
                                        name: e.target.value
                                    })
                                }} />
                                }
                                description={
                                    <div>
                                        <Input size="large" placeholder="请输入公司地址" onChange={(e) => {
                                            this.setState({
                                                address: e.target.value
                                            })
                                        }} />
                                        <Input size="large" placeholder="请输入公司联系人" onChange={(e) => {
                                            this.setState({
                                                people: e.target.value
                                            })
                                        }} />
                                        <Input size="large" placeholder="请输入公司电话" onChange={(e) => {
                                            this.setState({
                                                telePhone: e.target.value
                                            })
                                        }} />
                                        <TextArea rows={4} placeholder="请输入公司详情(包括地址,联系人，电话)" onChange={(e) => {
                                            this.setState({
                                                list: e.target.value
                                            })
                                        }} />
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.dataSources} />
                </Drawer>
            </div>
        );
    }
}

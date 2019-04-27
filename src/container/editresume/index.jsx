/*
 * @Author: zhaopengpeng 
 * @Date: 2019-03-30 08:34:37 
 * @Last Modified by: zhaopengpeng
 * @Last Modified time: 2019-03-30 09:59:51
 */
import React, { Component } from 'react'
import { Table } from 'antd'
import {Link} from 'react-router-dom'

import { Resizable } from 'react-resizable';

const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};

export default class EditResume extends Component {
    state = {
        columns: [{
            title: '上传时间',
            dataIndex: 'date',
            width: 200,
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
        }, {
            title: '数量',
            dataIndex: 'amount',
            width: 100,
        }, {
            title: '类型',
            dataIndex: 'type',
            width: 150,
        }, {
            title: '注释',
            dataIndex: 'note',
            width: 100,
        }, {
            title: '操作(1)',
            key: 'action',
            render: () => (
                <a href="javascript:;">Delete</a>
            ),
        },{
            title: '操作(2)',
            key: 'editor',
            render: () => (
                <Link to="/home/editors">Editor</Link>
            ),
        }],
    };

    components = {
        header: {
            cell: ResizeableTitle,
        }
    };

    data = [{
        key: 0,
        date: '2018-03-25',
        name:"张三",
        amount: 1,
        type: 'wrod-文档',
        note: '简历',
    }, {
        key: 1,
        date: '2018-03-14',
        name:"李四",
        amount: 2,
        type: 'wrod-文档',
        note: '简历',
    }, {
        key: 2,
        date: '2018-03-30',
        name:"王五",
        amount: 1,
        type: 'PNG-图片',
        note: '简历',
    },{
        key: 3,
        date: '2018-02-21',
        name:"赵六",
        amount: 1,
        type: 'wrod-文档',
        note: '简历',
    }];

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    };

    render() {
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index),
            }),
        }));
        return (
            <Table
                bordered
                components={this.components}
                columns={columns}
                dataSource={this.data}
            />

        );
    }
}

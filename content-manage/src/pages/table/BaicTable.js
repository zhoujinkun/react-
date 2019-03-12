import React, { Component } from 'react';
import {Card,Table,Button, Modal, message} from 'antd';
import Axios from '../../axios/axios';
import utils from '../../utils/utils';
class BaicTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource2:[]
         };
         this.params={
            page:1
        }
    }
    
    componentDidMount(){
        let dataSource = [
            {
                id:"1",
                userName:"Lili",
                sex:"female",
                hobby:"游泳",
                birthday:"2000-08-08",
                address:"北京朝阳",
                time:"7:20",
                state:"未婚",
                key:'0'
            }
        ];
        this.setState({
            dataSource
        })
        this.requestList();
    }
    //请求mock数据
    requestList=()=>{
        let _this = this;
        
        Axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                },
                //isShowloading:false,//默认加载的时候有loading
            }
        }).then((res)=>{
            //给请求的返回值动态添加key
            res.result.list.map((item,index)=>{
                return item.key = index;
            })
           if(res.code == 0){
                this.setState({
                    dataSource2:res.result.list,
                    // 删除成功后选中的为空
                    selectedRows:null,
                    selectedRowKeys:[],
                    pagination:utils.pagination(res,(current)=>{
                        this.params.page = current;
                        this.requestList();
                    })
                })
           }
        })
    }
    onRowClick=(record,index)=>{
        let selectKey = [index];//标准写法与可能是checkbox所以用数组
        Modal.info({
            title:"信息",
            content:`${record.userName}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    //删除
    handleDeleteClick=()=>{
        let rows = this.state.selectedRows;
        let ids = [];
        rows.forEach((item)=>{
            ids.push(item);
        });
        Modal.confirm({
            title:"删除提示",
            content:"确定删除吗？",
            onOk:()=>{
                message.success('删除成功');
                this.requestList();
               
            }
        })
    }
    render() {
        // 设置表头
        const column = [
            {
                title:'ID',
                dataIndex:'id' //与后台数据接口的值设置相同
            },
            {
                title:'用户名',
                dataIndex:'userName' //与后台数据接口的值设置相同
            },
            {
                title:'性别',
                dataIndex:'sex',//与后台数据接口的值设置相同
                render(state){
                    return state == '1' ? '男':'女';
                }
            },
            {
                title:'状态',
                dataIndex:'state', //与后台数据接口的值设置相同
            },
            {
                title:'爱好',
                dataIndex:'interest' ,//与后台数据接口的值设置相同
                render(state){
                    let config = {
                        '1':'游泳',
                        '2':'乒乓',
                        '3':'篮球',
                        '4':'台球',
                        '5':'游戏',
                    }
                    return config[state];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday' //与后台数据接口的值设置相同
            },
            {
                title:'早起时间',
                dataIndex:'time' //与后台数据接口的值设置相同
            },
            {
                title:'地址',
                dataIndex:'address' //与后台数据接口的值设置相同
            },
        ];
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            type:"radio",
            selectedRowKeys
        }
        const rowCheckSelection = {
            type:"checkbox",
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        columns={column}// 表头
                        dataSource={this.state.dataSource} //数据源
                        bordered  //有无边框
                        pagination={false} //分页
                    />
                </Card>
                <Card title="动态渲染表格">
                    <Table
                        columns={column}// 表头
                        dataSource={this.state.dataSource2} //数据源
                        bordered  //有无边框
                        pagination={false} //分页
                    />
                </Card>
                <Card title="单选-表格">
                    <Table
                        columns={column}// 表头
                        dataSource={this.state.dataSource2} //数据源
                        bordered  //有无边框
                        pagination={false} //分页
                        rowSelection = {rowSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{this.onRowClick(record,index);}
                            }
                        }}
                    />
                </Card>
                <Card title="多选-表格">
                    <div>
                        <Button onClick={this.handleDeleteClick}>删除</Button>
                    </div>
                    <Table
                        columns={column}// 表头
                        dataSource={this.state.dataSource2} //数据源
                        bordered  //有无边框
                        pagination={false} //分页
                        rowSelection = {rowCheckSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{this.onRowClick(record,index);}
                            }
                        }}
                    />
                </Card>
                <Card title="分页-表格">
                    <Table
                        columns={column}// 表头
                        dataSource={this.state.dataSource2} //数据源
                        bordered  //有无边框
                        pagination={this.state.pagination} //分页
                    />
                </Card>
            </div>
        );
    }
}

export default BaicTable;
import React, { Component } from 'react';
import {Card,Table,Button, Modal, message, Badge} from 'antd';
import Axios from '../../axios/axios';
import utils from '../../utils/utils';
class HeighTables extends Component {
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
        
        this.requestList();
    }
    //请求mock数据
    requestList=()=>{
        
        
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
                    pagination:utils.pagination(res,(current)=>{
                        this.params.page = current;
                        this.requestList();
                    })
                })
           }
        })
    }
   
   //删除操作
    handleDeleteClick=(item)=>{

        let id = item.id;
       
        Modal.confirm({
            title:"删除提示",
            content:"确定删除吗？",
            onOk:()=>{
                message.success('删除成功');
                this.requestList();
               
            }
        })
    }
    //分页，过滤，排序都可以用onChange事件
    handleChange=(pagination,filters,sorter)=>{
        this.setState({
            sortOrder:sorter.order,
        })
    }
    render() {
        // 设置表头
        const column = [
            {
                title:'ID',
                width:62,
                dataIndex:'id' ,//与后台数据接口的值设置相同
               
            },
            {
                title:'用户名',
                width:62,
                dataIndex:'userName' //与后台数据接口的值设置相同
            },
            {
                title:'性别',
                width:62,
                dataIndex:'sex',//与后台数据接口的值设置相同
                render(state){
                    return state == '1' ? '男':'女';
                }
            },
            {
                title:'状态',
                width:62,
                dataIndex:'state', //与后台数据接口的值设置相同
            },
            {
                title:'爱好',
                width:63,
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
                width:69,
                dataIndex:'birthday' //与后台数据接口的值设置相同
            },
            {
                title:'早起时间',
                width:116,
                dataIndex:'time', //与后台数据接口的值设置相同
            
            },
            {
                title:'地址',
                width:136,
                dataIndex:'address', //与后台数据接口的值设置相同
                
            },
        ];
        const column2 = [
            {
                title:'ID',
                width:62,
                dataIndex:'id' ,//与后台数据接口的值设置相同
                fixed:'left'
            },
            {
                title:'用户名',
                width:62,
                dataIndex:'userName' //与后台数据接口的值设置相同
            },
            {
                title:'性别',
                width:62,
                dataIndex:'sex',//与后台数据接口的值设置相同
                render(state){
                    return state == '1' ? '男':'女';
                }
            },
            {
                title:'状态',
                width:62,
                dataIndex:'state', //与后台数据接口的值设置相同
            },
            {
                title:'爱好',
                width:63,
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
                width:69,
                dataIndex:'birthday' //与后台数据接口的值设置相同
            },
            {
                title:'早起时间',
                width:116,
                dataIndex:'time', //与后台数据接口的值设置相同
                
            },
            {
                title:'地址',
                width:136,
                dataIndex:'address', //与后台数据接口的值设置相同
                
            },
            {
                title:'手机号',
                width:136,
                dataIndex:'phone', //与后台数据接口的值设置相同
                // fixed:'right'
            },
            {
                title:'邮箱',
                width:136,
                dataIndex:'email', //与后台数据接口的值设置相同
                // fixed:'right'
            },
        ];
        const column3 = [
            {
                title:'ID',
                width:62,
                dataIndex:'id' ,//与后台数据接口的值设置相同
        
            },
            {
                title:'用户名',
                width:62,
                dataIndex:'userName' //与后台数据接口的值设置相同
            },
            {
                title:'年龄',
                width:62,
                dataIndex:'age', //与后台数据接口的值设置相同
                //设置排序的列
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder,
            },
            {
                title:'性别',
                width:62,
                dataIndex:'sex',//与后台数据接口的值设置相同
                render(state){
                    return state == '1' ? '男':'女';
                }
            },
            {
                title:'状态',
                width:62,
                dataIndex:'state', //与后台数据接口的值设置相同
            },
            {
                title:'爱好',
                width:63,
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
                width:69,
                dataIndex:'birthday' //与后台数据接口的值设置相同
            },
            {
                title:'早起时间',
                width:116,
                dataIndex:'time', //与后台数据接口的值设置相同
                
            },
            {
                title:'地址',
                width:136,
                dataIndex:'address', //与后台数据接口的值设置相同
                
            },
          
        ];
        const column4 = [
            {
                title:'ID',
                width:62,
                dataIndex:'id' ,//与后台数据接口的值设置相同
        
            },
            {
                title:'用户名',
                width:62,
                dataIndex:'userName' //与后台数据接口的值设置相同
            },
            {
                title:'年龄',
                width:62,
                dataIndex:'age', //与后台数据接口的值设置相同
                //设置排序的列
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder,
            },
            {
                title:'性别',
                width:62,
                dataIndex:'sex',//与后台数据接口的值设置相同
                render(state){
                    return state == '1' ? '男':'女';
                }
            },
            {
                title:'状态',
                width:62,
                dataIndex:'state', //与后台数据接口的值设置相同
            },
            {
                title:'爱好',
                width:63,
                dataIndex:'interest' ,//与后台数据接口的值设置相同
                render(state){
                    let config = {
                        '1':<Badge text="游泳" status="success"/>,
                        '2':<Badge text="篮球" status="warning"/>,
                        '3':<Badge text="乒乓" status="processing"/>,
                        '4':<Badge text="编程" status="error"/>,
                        '5':<Badge text="音乐" status="default"/>,
                    }
                    return config[state];
                }
            },
            {
                title:'生日',
                width:69,
                dataIndex:'birthday' //与后台数据接口的值设置相同
            },
            {
                title:'早起时间',
                width:116,
                dataIndex:'time', //与后台数据接口的值设置相同
                
            },
            {
                title:'地址',
                width:136,
                dataIndex:'address', //与后台数据接口的值设置相同
                
            },
            {
                title:'操作',
                width:136,
                dataIndex:'do', //与后台数据接口的值设置相同
                render:(text,item)=>{
                    return <a onClick={(item)=>{this.handleDeleteClick(item)}}>删除</a>  //删除操作
                }
                
            },
          
        ];
        
        return (
            <div>
                <Card title="表头固定">
                    <Table
                        columns={column}// 表头
                        dataSource={this.state.dataSource2} //数据源
                        bordered  //有无边框
                        pagination={false} //分页
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左右固定">
                    <Table
                        columns={column2}// 表头
                        dataSource={this.state.dataSource2} //数据源
                        bordered  //有无边框
                        pagination={false} //分页
                        scroll={{x:930}} // 必须与表头的宽度差不多，才能保证页面效果较好
                    />
                </Card>
                <Card title="排序">
                    <Table
                        columns={column3}// 表头
                        dataSource={this.state.dataSource2} //数据源
                        bordered  //有无边框
                        pagination={false} //分页
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="带操作">
                    <Table
                        columns={column4}// 表头
                        dataSource={this.state.dataSource2} //数据源
                        bordered  //有无边框
                        pagination={false} //分页
                        onChange={this.handleChange}
                    />
                </Card>
            </div>
        );
    }
}
export default HeighTables;
import React, { Component } from 'react';
import {Card,Form,Button,Select,Table,Modal,Radio, message,DatePicker } from 'antd';
import BaseFormItem from '../../components/baseFormItem/BaseFormItem';
import utils from '../../utils/utils';
import Axios from '../../axios/axios';
const FormItem = Form.Item;
const {Option} = Select;
const {RadioGroup} = Radio;
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isShowOpenCity:false, // Model开关
         };
        this.params={
            page:1
        }
    }
    formList = [
        {
            type:'SELECT',
            placeholder:'全部',
            width:100,
            field:'city',
            initialValue:'1',
            label:'城市',
            list:[{id:'0',name:"全部"},{id:"1",name:"北京"},{id:"2",name:"上海"},{id:"3",name:"深圳"}]
        },
        {
            type:'时间查询',
            field:['start_time','end_time']
        },
        {
            type:'SELECT',
            placeholder:'全部',
            field:'order_status',
            width:100,
            initialValue:'1',
            label:'订单状态',
            list:[{id:'0',name:"全部"},{id:"1",name:"进行中"},{id:"2",name:"进行中(临时上锁)"},{id:"3",name:"结束"}]
        },
    ]
    componentDidMount(){
        this.requestList();
    }
    handleOrderSubmit=(params)=>{
        this.params = params;
        this.requestList();
    }
    requestList=()=>{
        Axios.requestList(this.params,'/order/list',this,true)
    }
    // 打开开通城市弹窗
    handleClickOpenCity=()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
    //确认提交
    handleSubmit=()=>{
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        // 请求数据
        Axios.ajax({
            url:'/city/open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            console.log(res)
            message.success(
                `${res.result}`
            )
            // 成功之后关闭弹窗
            this.setState({
                isShowOpenCity:false,
            })
            //重新渲染数据
            this.requestList()
        })
    }
    onRowClick=(record,index)=>{
        let selectKey = [index];//标准写法与可能是checkbox所以用数组
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    // 订单详情
    openOrderDetail=()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"信息",
                content:"请选择一条订单"
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    render() {
        const column = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        return (
           
            <div>
               <Card>
                    <BaseFormItem formList={this.formList} handleBaseToOrder={this.handleOrderSubmit}/>
                    <div>
                        <Card>
                            <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                            <Button type="primary">结束订单</Button>
                        </Card>
                        <Table
                            bordered
                            columns={column}
                            dataSource={this.state.dataSource}
                            pagination={this.state.pagination}
                            rowSelection={rowSelection}
                            onRow={(record,index)=>{
                                return {
                                    onClick:()=>{this.onRowClick(record,index);}
                                }
                            }}
                        />
                        <Modal
                            title="开通城市"
                            visible={this.state.isShowOpenCity}
                            onCancel={()=>{
                                this.setState({
                                    isShowOpenCity:false
                                })
                            }}
                            onOk={this.handleSubmit}
                        >
                         <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst}}/>
                        </Modal>
                    </div>
               </Card>
            </div>
        );
    }
}

class OpenCityForm extends Component {
    render(){
        const {getFieldDecorator} = this.props.form;
        const OpenCityLayOut = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        return(
            <div>
                <Form layout="horizontal">
                    <FormItem label="选择城市" {...OpenCityLayOut}>
                        {
                            getFieldDecorator('city_id',{
                                initialValue:'1'
                            })(
                                <Select style={{width:'100px'}}>
                                    <Option value="">全部</Option>
                                    <Option value="1">北京市</Option>
                                    <Option value="2">天津市</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="运营模式" {...OpenCityLayOut}>
                        {
                            getFieldDecorator('op_mode',{
                                initialValue:'1'
                            })(
                                <RadioGroup>
                                    <Radio value="1">自营</Radio>
                                    <Radio value="2">加盟</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label="用车模式" {...OpenCityLayOut}>
                        {
                            getFieldDecorator('use_mode',{
                                initialValue:'1'
                            })(
                                <RadioGroup>
                                    <Radio value="1">指定停车点模式</Radio>
                                    <Radio value="2">禁停区模式</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}
OpenCityForm = Form.create()(OpenCityForm);
export default Order;
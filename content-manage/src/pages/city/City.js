import React, { Component } from 'react';
import {Card,Form,Button,Select,Table,Modal,Radio, message} from 'antd';
import utils from '../../utils/utils';
import Axios from '../../axios/axios';
import RadioGroup from 'antd/lib/radio/group';
const FormItem = Form.Item;
const {Option} = Select;
class City extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isShowOpenCity:false, // Model开关
         };
        this.params={
            page:1
        }
    }
    componentDidMount(){
        this.requestList();
    }
    requestList=()=>{
        // let cityInfo = this.props.form.getFieldsValue();
        Axios.ajax({
            url:'/open_city',
            data:{
                params:{page:this.params.page}         //cityInfo
            }
        }).then((res)=>{
            this.setState({
                dataSource:res.result.item_list.map((item,index)=>{
                    //直接返回带有key的数组
                    item.key = index;
                    return item;
                }),
                pagination:utils.pagination(res,(current)=>{
                    this.params.page = current;
                    this.requestList();
                })
            })
        })
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
        })
    }
    render() {
        const column = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode ==1 ?'停车点':'禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: utils.formateDate()
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]
        return (
            <div>
               <Card>
                    <FilterForm/>
                    <div>
                        <Card>
                            <Button type="primary" onClick={this.handleClickOpenCity}>开通城市</Button>
                        </Card>
                        <Table
                            bordered
                            columns={column}
                            dataSource={this.state.dataSource}
                            pagination={this.state.pagination}
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

class FilterForm extends Component {
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div>
                <Card>
                    <Form layout="inline">
                        <FormItem label="城市">
                            {
                                getFieldDecorator('city_id')(
                                    <Select
                                        style={{width:100}}
                                        placeholder="全部"
                                    >
                                        <Option value="">全部</Option>
                                        <Option value="1">北京市</Option>
                                        <Option value="2">天津市</Option>
                                        <Option value="3">深圳市</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="用车模式">
                            {
                                getFieldDecorator('mode')(
                                    <Select
                                        style={{ width: 120 }}
                                        placeholder="全部"
                                    >
                                        <Option value="">全部</Option>
                                        <Option value="1">指定停车点模式</Option>
                                        <Option value="2">禁停区模式</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="运营模式">
                            {
                                getFieldDecorator('op_mode')(
                                    <Select
                                        style={{ width: 80 }}
                                        placeholder="全部"
                                    >
                                        <Option value="">全部</Option>
                                        <Option value="1">自营</Option>
                                        <Option value="2">加盟</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="加盟商授权状态">
                            {
                                getFieldDecorator('auth_status')(
                                    <Select
                                        style={{ width: 100 }}
                                        placeholder="全部"
                                    >
                                        <Option value="">全部</Option>
                                        <Option value="1">已授权</Option>
                                        <Option value="2">未授权</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{marginRight:'15px'}}>查询</Button>
                            <Button type="default">重置</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
FilterForm = Form.create()(FilterForm);
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
export default City;
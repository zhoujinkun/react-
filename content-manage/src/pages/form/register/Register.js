import React, { Component } from 'react';
import {
    Card,Form, Input, Radio,Switch, Icon,  Select, Checkbox, Button,  InputNumber, DatePicker, Upload,
  } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import moment from 'moment'; //使用DatePicker 必须安装moment插件
const {Item} = Form;
const {Option} = Select;
const {TextArea} = Input;
let getBase64=(img, callback)=> {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
     
      handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
      }

      //获取表单的值
      handleClick=()=>{
          let userInfo = this.props.form.getFieldsValue(); //该方法能够获得表单提交的所有信息
          console.log(userInfo)
      }
    render() {
        const {getFieldDecorator} = this.props.form;
        // 设置表单栅格系统布局  制作成响应式的
        const FormItemLayout = {
            //左半边的名字的布局
            labelCol:{
                xs:24, // <576像素的布局
                sm:4,  // >576像素的布局
            },
            //右边表单元素的布局
            wrapperCol:{
                xs:24,
                sm:12,  //上边的sm加现在的sm小于24就OK
            }
        }
        // 设置新的布局
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return (
            <div>
                <Card title="表单">
                    <Form layout="horizontal">
                    {/* 解构成属性值赋予FormItem */}
                        <Item label="用户名" {...FormItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )
                            }
                        </Item>
                        <Item label="密码" {...FormItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                        </Item>
                        <Item label="性别" {...FormItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'1',
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </Item>
                        <Item label="年龄" {...FormItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue:'18',
                                })(
                                    <InputNumber/>
                                )
                            }
                        </Item>
                        <Item label="是否已婚" {...FormItemLayout}>
                            {
                                getFieldDecorator('marry',{
                                    valuePropName: 'checked',
                                    initialValue:true
                                })(
                                    <Switch/>
                                )
                            }
                        </Item>
                        <Item label="学历" {...FormItemLayout}>
                            {
                                getFieldDecorator('education',{
                                    
                                })(
                                    <Select>
                                        <Option value="初中">初中</Option>
                                        <Option value="高中">高中</Option>
                                        <Option value="专科">专科</Option>
                                        <Option value="本科">本科</Option>
                                        <Option value="硕士">硕士</Option>
                                        <Option value="博士">博士</Option>
                                    </Select>
                                )
                            }
                        </Item>
                        <Item label="爱好" {...FormItemLayout}>
                            {
                                getFieldDecorator('education',{
                                    
                                })(
                                    <Select mode="multiple">
                                        <Option value="编程">编程</Option>
                                        <Option value="打篮球">打篮球</Option>
                                        <Option value="跑步">跑步</Option>
                                        <Option value="登山">登山</Option>
                                        <Option value="听音乐">听音乐</Option>
                                        <Option value="读书">读书</Option>
                                    </Select>
                                )
                            }
                        </Item>
                        <Item label="生日" {...FormItemLayout}>
                            {
                                getFieldDecorator('birth',{
                                   initialValue:moment("1991-11-11")
                                })(
                                    <DatePicker
                                        format="YYYY/MM/DD"
                                    /> 
                                )
                            }
                        </Item>
                        <Item label="联系地址" {...FormItemLayout}>
                            {
                                getFieldDecorator('address',{
                                   
                                })(
                                    <TextArea
                                        
                                    /> 
                                )
                            }
                        </Item>
                        <Item label="文件上传" {...FormItemLayout}>
                            {
                                getFieldDecorator('upload',{
                                   
                                })(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.imageUrl?<img src={this.state.imageUrl}/>:<Icon type="plus"/>}
                                    </Upload> 
                                )
                            }
                        </Item>
                        <Item  {...offsetLayout}>
                            {
                                getFieldDecorator('box',{
                                   
                                })(
                                     <Checkbox>我已阅读注册协议</Checkbox>
                                )
                            }
                        </Item>
                        <Item  {...offsetLayout}>
                            <Button type="primary" onClick={this.handleClick}>注册</Button>
                        </Item>
                        
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Register);
import React, { Component } from 'react';
import {Form,Card,Input,Icon,Button,Checkbox} from 'antd';
const {Item} = Form;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {getFieldDecorator} = this.props.form; // 该方法可以简单地获取到表单数据
        return (
            <div>
                <Card title="登陆">
                    <Form layout="inline">
                        <Item>
                            {
                            getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )  
                            }
                        </Item>
                        <Item>
                            {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
                            )  
                            }
                            
                        </Item>
                        <Item>
                            <Button>登陆</Button>
                        </Item>
                    </Form>
                </Card>
                <Card title="登陆">
                    <Form layout="horizontal" style={{width:'300px'}}>
                        <Item>
                            {
                            getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )  
                            }
                        </Item>
                        <Item>
                            {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
                            )  
                            }
                            
                        </Item>
                        <Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a style={{float:'right'}} href="">Forgot password</a>
                            <Button style={{width:"100%"}}>登陆</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Login); // 必须用create
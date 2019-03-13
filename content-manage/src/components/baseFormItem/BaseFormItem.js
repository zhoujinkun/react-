import React, { Component } from 'react';
import { Form,Checkbox,Select,Input,Button, DatePicker } from 'antd';
import utils from '../../utils/utils';
const FormItem = Form.Item; 
const {Option} = Select;

class BaseFormItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    initFormList = ()=>{
        const {getFieldDecorator} = this.props.form;
        let formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length>0){
            formList.forEach((item)=>{
                let label = item.label;
                let placeHolder = item.placeholder;
                let field = item.field;
                let width = item.width;
                let initValue = item.initialValue || '';
                if(item.type === 'SELECT'){
                    const SELECT =  <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue:initValue
                            })(
                                <Select   //有一个未解的类型错误
                                    style={{width:width}}
                                    placeholder={placeHolder}
                                >
                                    {utils.getOptionsList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                }else if(item.type == 'INPUT'){
                    const INPUT =  <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue:initValue
                            })(
                               <Input placeholder={placeHolder}/>
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                }else if(item.type == 'CHECKBOX'){
                    const CHECKBOX =  <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                valuePropName:'checked',
                                initialValue:initValue
                            })(
                               <Checkbox>{label}</Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX);
                }else if(item.type == '时间查询'){
                    const start_time =  <FormItem key={field[0]}>
                        {
                            getFieldDecorator('start_time')(
                               <DatePicker format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                    formItemList.push(start_time);
                    //取消掉antd label属性自带的：
                    const end_time =  <FormItem label="~" colon={false} key={field[1]}>
                        {
                            getFieldDecorator('end_time')(
                               <DatePicker format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time);
                }
                
               
            })
            return formItemList; 
        }
    }
    handleBaseFormClick=()=>{
        let baseFormValue = this.props.form.getFieldsValue();
        //子传父
        this.props.handleBaseToOrder(baseFormValue);
    }
    handleReset=()=>{
        this.props.form.resetFields();
    }
    render() {
         
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{marginRight:'15px'}} onClick={this.handleBaseFormClick}>查询</Button>
                    <Button type="default" onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(BaseFormItem);
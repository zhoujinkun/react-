import React, { Component } from 'react';
import {Card,Modal,Button} from 'antd'
import '../ui.less';
class Modals extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showModal1:false,
            showModal2:false,
            showModal3:false,
            showModal4:false,
         };
    }
    handleClickOpen= (type)=>{
        // 技巧 给属性赋值
        this.setState({
            [type]:true
        })
    }
    handleClickConfirm=(type)=>{
        Modal[type]({
            title:"确认",
            content:"努力学习",
            onOk(){
                console.log('ok');
            },
            onCancel(){
                console.log('cancel');
            }
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框">
                                        {/*坑  函数传值必须使用箭头函数包裹 */}
                    <Button onClick={() => this.handleClickOpen('showModal1')}>Open</Button>
                    <Button onClick={() => this.handleClickOpen('showModal2')}>自定义页脚</Button>
                    <Button onClick={() => this.handleClickOpen('showModal3')}>顶部20px</Button>
                    <Button onClick={() => this.handleClickOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框">
                                        {/*坑  函数传值必须使用箭头函数包裹 */}
                    <Button onClick={() => this.handleClickConfirm('confirm')}>Confirm</Button>
                    <Button onClick={() => this.handleClickConfirm('info')}>Info</Button>
                    <Button onClick={() => this.handleClickConfirm('success')}>Success</Button>
                    <Button onClick={() => this.handleClickConfirm('warning')}>Warning</Button>
                </Card>
                <Modal 
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={()=>{
                        this.setState({
                            showModal1:false
                        })
                    }}
                >
                    <p>天道酬勤</p>
                </Modal>
                <Modal 
                    title="React"
                    visible={this.state.showModal2}
                    okText="下一步"
                    cancelText="算了"
                    onCancel={()=>{
                        this.setState({
                            showModal2:false
                        })
                    }}
                >
                    <p>天道酬勤</p>
                </Modal>
                <Modal 
                    title="React"
                    visible={this.state.showModal3}
                    style={{top:20}}
                    onCancel={()=>{
                        this.setState({
                            showModal3:false
                        })
                    }}
                >
                    <p>天道酬勤</p>
                </Modal>
                <Modal 
                    title="React"
                    visible={this.state.showModal4}
                    className="vertical-center-modal"
                    onCancel={()=>{
                        this.setState({
                            showModal4:false
                        })
                    }}
                >
                    <p>天道酬勤</p>
                </Modal>

            </div>
        );
    }
}

export default Modals;
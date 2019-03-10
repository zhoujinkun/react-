import React, { Component } from 'react';
import {Card,Button,Message} from 'antd';
class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    handleClickMessage=(type)=>{
        Message[type]("面试必胜");
    }
    render() {
        return (
            <div>
                <Card title="全局提示">
                    <Button type="primary" onClick={()=>this.handleClickMessage('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.handleClickMessage('error')}>error</Button>
                    <Button type="primary" onClick={()=>this.handleClickMessage('info')}>info</Button>
                    <Button type="primary" onClick={()=>this.handleClickMessage('warning')}>warning</Button>
                </Card>
            </div>
        );
    }
}

export default Messages;
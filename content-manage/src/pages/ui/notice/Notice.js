import React, { Component } from 'react';
import {Card,Button,notification} from 'antd';
class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    handleOpenNotice=(type,direction)=>{
        //如果存在方位，就配置提醒框的方位
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:"通知标题",
            description:"通知内容"
        })
    }
    render() {
        return (
            <div>
                <Card title="消息提醒框">
                    <Button type="ghost" onClick={()=>this.handleOpenNotice('success')}>success</Button>
                    <Button type="ghost" onClick={()=>this.handleOpenNotice('warning')}>warning</Button>
                    <Button type="ghost" onClick={()=>this.handleOpenNotice('info')}>info</Button>
                    <Button type="ghost" onClick={()=>this.handleOpenNotice('error')}>error</Button>
                </Card>
                <Card title="消息提醒框">
                    <Button type="primary" onClick={()=>this.handleOpenNotice('success','topLeft')}>success</Button>
                    <Button type="primary" onClick={()=>this.handleOpenNotice('warning','topRight')}>warning</Button>
                    <Button type="primary" onClick={()=>this.handleOpenNotice('info','bottomLeft')}>info</Button>
                    <Button type="primary" onClick={()=>this.handleOpenNotice('error','bottomRight')}>error</Button>
                </Card>
            </div>
        );
    }
}

export default Notice;
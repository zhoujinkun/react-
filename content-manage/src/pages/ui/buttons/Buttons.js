import React, { Component } from 'react';
import {Card,Button,Radio} from 'antd';
import '../ui.less';
class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading:true,
            size:"default"
         };
    }
    //关闭按钮加载
    handleCloseLoading(){
        this.setState({
            loading:false
        })
    }
    // 打开加载
    handleOpenLoading(){
        this.setState({
            loading:true
        })
    }
    // 改变大小
    handleChangeSize(e){
        this.setState({
            size:e.target.value //获取事件对象的值
        })
    }
    render() {
        return (
            <div className="buttons">
                <Card title="基础按钮">
                    <Button type="default">HB AU default</Button>
                    <Button type="danger">HB AU danger</Button>
                    <Button type="danshed">HB AU danshed</Button>
                    <Button type="primary">HB AU primary</Button>
                    <Button type="disabled">HB AU disabled</Button>
                </Card>
                <Card title="图形按钮">
                    <Button icon="search" shape="circle"></Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="plus">添加</Button>
                    <Button icon="download">下载</Button>
                    <Button icon="search">搜索</Button>
                </Card>
                <Card title="Loading按钮">
                    <Button loading={this.state.loading} shape="circle"></Button>
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" onClick={this.handleCloseLoading.bind(this)}>关闭</Button>
                    <Button type="primary" loading={this.state.loading} shape="circle"></Button>
                    <Button loading={this.state.loading} onClick={this.handleOpenLoading.bind(this)}>点击加载</Button>
                </Card>
                <Card title="前进返回">
                    <Button.Group>
                        <Button icon="left"  type="primary">前进</Button>
                        <Button icon="right" type="primary">返回</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸">
                    <Radio.Group value={this.state.size} onChange={this.handleChangeSize.bind(this)}>
                        <Radio value="large">大</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="small">小</Radio>
                    </Radio.Group>
                    <Button size={this.state.size} type="default">HB AU default</Button>
                    <Button size={this.state.size} type="danger">HB AU danger</Button>
                    <Button size={this.state.size} type="danshed">HB AU danshed</Button>
                    <Button size={this.state.size} type="primary">HB AU primary</Button>
                    <Button size={this.state.size} type="disabled">HB AU disabled</Button>
                </Card>
            </div>
        );
    }
}

export default Buttons;
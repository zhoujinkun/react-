import React, { Component } from 'react';
import {Card,Spin,Icon,Alert} from 'antd';
class Spins extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const container = (
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          );
        return (
            <div>
                <Card title="Spin用法">
                    <Spin size="small"/>
                    <Spin/>
                    <Spin size="large"/>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }}/>}/>
                </Card>
                <Card title="内容遮罩">
                    <Spin spinning={true} delay={500}>{container}</Spin>
                    <Spin spinning={true} delay={500} tip="加载中···">{container}</Spin>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }}/>} delay={500}>{container}</Spin>
                </Card>
            </div>
        );
    }
}

export default Spins;
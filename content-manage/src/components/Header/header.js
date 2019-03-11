import React, { Component } from 'react';
import {Row,Col} from 'antd'
import Utils from '../../utils/utils';
import './header.less';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        this.setState({
            userName:"锦坤"
        })
        setInterval(()=>{
            let systemTime = Utils.formateDate(new Date().getTime());
            this.setState({
                systemTime
            })
        },1000)
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">首页</Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.systemTime}</span>
                        <span className="weather-detial">晴</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;
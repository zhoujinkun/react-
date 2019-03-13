import React, { Component } from 'react';
import {Row} from 'antd';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import './style/common.less';
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Row className="simple-page"> 
                    <Header menuType="second"/>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
               <Row className="footer-common">
                    <Footer />
               </Row>
            </div>
        );
    }
}

export default Admin;
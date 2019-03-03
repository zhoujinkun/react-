import React, { Component } from 'react';
import './footer.less';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="footer">
                 版权所有：web_K（推荐使用谷歌浏览器，可以获得更佳操作页面体验） 技术支持：web_K
            </div>
        );
    }
}

export default Footer;
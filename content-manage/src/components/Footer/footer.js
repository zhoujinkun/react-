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
                 推荐使用谷歌浏览器，可以获得更佳操作页面体验
            </div>
        );
    }
}

export default Footer;
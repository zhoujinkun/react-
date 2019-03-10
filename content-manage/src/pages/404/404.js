import React, { Component } from 'react';
import './404.less';
class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="error">
                404 Error!!!
            </div>
        );
    }
}

export default NoMatch;
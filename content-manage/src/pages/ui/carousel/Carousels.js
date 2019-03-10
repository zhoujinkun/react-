import React, { Component } from 'react';
import {Card,Carousel} from 'antd';
import './carousels.less';
class Carousels extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    // onChange=(a,b,c)=>{
    //     console.log(a,b,c);
    // }
    render() {
        return (
            <div>
                <Card title="文字轮播图">
                    <Carousel 
                        // afterChange={this.onChange}
                        autoplay={true}
                        effect="fade"
                    >
                        <div><h3>Vue</h3></div>
                        <div><h3>React</h3></div>
                        <div><h3>Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播图">
                    <Carousel 
                        // afterChange={this.onChange}
                        autoplay={true}
                        effect="fade"
                    >
                        <div><img src="/assets/carousel-img/carousel-1.jpg" alt=""/></div>
                        <div><img src="/assets/carousel-img/carousel-2.jpg" alt=""/></div>
                        <div><img src="/assets/carousel-img/carousel-3.jpg" alt=""/></div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}

export default Carousels;
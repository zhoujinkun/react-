import React, { Component } from 'react';
import {Card,Row,Col,Modal} from 'antd';
const {Meta} = Card;
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible:false
         };
    }
    handleOpenImg=(item)=>{
        this.setState({
            visible:true,
            imgSrc:`/gallery/${item}`
        })
    }
    render() {
        const imgs = [
            ['1.png','2.png','3.png','4.png'],
            ['5.png','6.png','7.png','8.png'],
            ['9.png','10.png','11.png','12.png'],
            ['13.png','14.png','15.png','16.png'],
            ['17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png'],
        ];
        const imgArr = imgs.map(row=>row.map((item,index)=>
                <Card
                    key={index}
                    cover={<img src={"/gallery/"+item} alt="" onClick={()=>this.handleOpenImg(item)}/>}
                >
                    <Meta
                        title="Europe Street beat"
                        description="www.instagram.com"
                    />
                </Card>
            )) 
        return (
            <div>
                <Row gutter={10}>
                    <Col md={4}>{imgArr[0]}</Col>
                    <Col md={4}>{imgArr[1]}</Col>
                    <Col md={4}>{imgArr[2]}</Col>
                    <Col md={4}>{imgArr[3]}</Col>
                    <Col md={4}>{imgArr[4]}</Col>
                    <Col md={4}>{imgArr[5]}</Col>
                </Row>
                <Modal
                    width={300}
                    title="美景"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                >
                    {<img src={this.state.imgSrc} alt="" style={{width:'100%'}}/>}
                </Modal>
            </div>
        );
    }
}

export default Gallery;
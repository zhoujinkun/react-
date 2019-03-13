import React, { Component } from 'react';
import {Card} from 'antd';
import './detail.less'
import Axios from '../../axios/axios';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        //获取路由上的id值
        let orderId = this.props.match.params.orderId;
        this.getOrderInfo(orderId);
    }
    //获取订单信息
    getOrderInfo = (orderId)=>{
        Axios.ajax({
            url:"/order/detail",
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res)=>{
            this.setState({
                orderInfo:res.result
            })
            // 渲染地图
            this.renderMap(res.result);
        })
    }
    //渲染地图
    renderMap=(result)=>{
        const map = new window.BMap.Map("orderDetailMap");
        
        // 调用添加控件方法
        this.addMapControl(map);
        // 调用绘制路线方法
        this.drawBikeRoute(result.position_list,map);
        // 调用绘制服务区方法
        this.drawServiceArea(result.area,map);
    }
    // 添加地图控件
    addMapControl=(map)=>{
        map.addControl(new window.BMap.ScaleControl({ anchor : 'BMAP_ANCHOR_TOP_LEFT'}))
        map.addControl(new window.BMap.NavigationControl({ anchor : 'BMAP_ANCHOR_TOP_LEFT'}))
    }
    //绘制路线
    drawBikeRoute=(positionList,map)=>{
        // 起始坐标
        let start_point = '';
        // 结束坐标
        let end_point = '';
        if(positionList.length>0){
            let first = positionList[0];
            let end = positionList[positionList.length-1];
            start_point = new window.BMap.Point(first.lon,first.lat);//起始坐标（经度，纬度）
            // 起始坐标的图标(路径，Icon的大小,图片的大小)
            let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(36,42)
            })
            //Icon不能直接用到地图上，必须要依赖mark(位置，图标位置)
            let startMarker = new window.BMap.Marker(start_point,{icon:startIcon});
            //添加到地图上
            map.addOverlay(startMarker);
            end_point = new window.BMap.Point(end.lon,end.lat);//结束坐标（经度，纬度）
            // 结束坐标的图标(路径，Icon的大小,图片的大小)
            let endIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(36,42)
            })
            //Icon不能直接用到地图上，必须要依赖mark(位置，图标位置)
            let endMarker = new window.BMap.Marker(end_point,{icon:endIcon});
            //添加到地图上
            map.addOverlay(endMarker);

            //连接路线
            let trackPoint = [];//存储每一个地图形式的经纬度
            for(let i =0;i<positionList.length;i++){
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon,point.lat));
            }
            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:'#ff5400',//路线颜色
                strokeWeight:3,//路线粗度
                strokeOpacity:1//路线透明度
            })
            // 添加到地图上
            map.addOverlay(polyline);
            //地图中心点
            map.centerAndZoom(end_point, 11); 
        }
    }
    //绘制服务区
    drawServiceArea=(areaList,map)=>{
        let trackPoint = [];
        for(let i=0;i<areaList.length;i++){
            let point = areaList[i];
            trackPoint.push(new window.BMap.Point(point.lon,point.lat));
        }
        let polygon = new window.BMap.Polygon(trackPoint,{
            strokeColor:'#459aee',//路线颜色
            strokeWeight:3,//路线粗度
            strokeOpacity:1,//路线透明度
            fillColor:"#ff5400",//填充颜色
            fillOpacity:0.4//填充透明度
        })
        map.addOverlay(polygon);
    }
    render() {
        const orderInfo = this.state.orderInfo || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo.mode==1?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{orderInfo.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{orderInfo.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{orderInfo.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{orderInfo.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{orderInfo.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Detail;
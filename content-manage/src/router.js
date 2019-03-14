import React, { Component } from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import App from './App'//引入根节点,作为路由内容的展示容器
// import Login from './pages/Login/Login';//登陆
import Admin from './admin';//管理者
import NoMatch from './pages/404/404';//404页面
import Home from './pages/Home/home';//首页
// UI页面 
import Buttons from './pages/ui/buttons/Buttons';//UI Button 页面
import Modals from './pages/ui/modals/Modals';//UI Modals 页面
import Spins from './pages/ui/spin/Spin';//UI Spins 页面
import Notice from './pages/ui/notice/Notice';//UI Notice 页面
import Message from './pages/ui/messages/Messages';//UI Notice 页面
import Tab from './pages/ui/tabs/Tabs';//UI Notice 页面
import Gallery from './pages/ui/gallery/Gallery';//UI 画廊 页面
import Carousels from './pages/ui/carousel/Carousels';//UI 轮播图 页面
//Form
import Login from './pages/form/login/Login'; //Form 登陆 页面
import Register from './pages/form/register/Register';//Form 注册 页面
//table
import BaicTable from './pages/table/BaicTable';//table 基础表格 页面
import HighTables from './pages/table/HighTables';//table 高级表格 页面
//城市管理页面
import City from './pages/city/City';
// 订单管理页面   
import Order from './pages/order/Order';
//订单详情页面根页面
import Common from './common';
//订单详情页面
import Detail from './pages/order/Detail';
// 员工管理页面
import User from './pages/user/User';
// 车辆地图   
import bikeMap from './pages/map/bikeMap';
// 柱形图
import Bar from './pages/echarts/bar/index';
//饼图
import Pie from './pages/echarts/pie/index';
// 折线图
import Lines from './pages/echarts/line/index';
// 富文本
import Rich from './pages/rich/index';
class IRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Router>
                <App>
                    {/* <Route path="/login" component={Login}/> */}
                    <Route path="/admin" render={()=>
                        <Admin>
                            {/* switch匹配到一个路由后就不再匹配其他的路由 */}
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/ui/buttons" component={Buttons}/>
                                <Route path="/admin/ui/modals" component={Modals}/>
                                <Route path="/admin/ui/loadings" component={Spins}/>
                                <Route path="/admin/ui/notification" component={Notice}/>
                                <Route path="/admin/ui/messages" component={Message}/>
                                <Route path="/admin/ui/tabs" component={Tab}/>
                                <Route path="/admin/ui/gallery" component={Gallery}/>
                                <Route path="/admin/ui/carousel" component={Carousels}/>
                                <Route path="/admin/form/login" component={Login}/>
                                <Route path="/admin/form/reg" component={Register}/>
                                <Route path="/admin/table/basic" component={BaicTable}/>
                                <Route path="/admin/table/high" component={HighTables}/>
                                <Route path="/admin/city" component={City}/>
                                <Route path="/admin/order" component={Order}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/bikeMap" component={bikeMap}/>
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Route path="/admin/charts/line" component={Lines}/>
                                <Route path="/admin/rich" component={Rich}/>
                                <Route component={NoMatch}/>    
                            </Switch>    
                        </Admin>
                    }/>
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={Detail}/>   
                        </Common>
                    }/>
                </App>
            </Router>
        );
    }
}

export default IRouter;
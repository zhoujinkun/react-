import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Menu } from 'antd';
//引入redux
import {connect} from 'react-redux';
import {switchMenu} from '../../redux/action/action'
import menuList from '../../config/menuConfig.js';
import './navleft.less';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
class Navleft extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentKey:""
         };
    }
    //menu组件onClick自带的用法
    handleClick=({item,key})=>{
        const {dispatch} = this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })
    }
    componentWillMount(){
        const menuTreeCode = this.renderMenu(menuList);
        this.setState({
            menuTreeCode
        })
    }
    //渲染菜单
    renderMenu = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return(
                    // 递归调用
                    <SubMenu key={item.key} title={<span>{item.title}</span>}>
                        { this.renderMenu(item.children) }     
                    </SubMenu>
                )
            }               //一定要设置title不然无法用props获取到title值，影响redux
            return  <Menu.Item key={item.key} title={item.title}>
                        <NavLink to={item.key}>{ item.title } </NavLink>  
                    </Menu.Item>
        })
        
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/noda.jpg" alt=""/>
                    <h1>HB-ND-MS</h1>
                </div>
                <Menu mode="vertical" theme="dark" selectedKeys={this.state.currentKey} onClick={this.handleClick}>
                    {this.state.menuTreeCode}
                </Menu>
            </div>
        );
    }
}

export default connect()(Navleft);
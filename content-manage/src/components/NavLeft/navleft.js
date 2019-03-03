import React, { Component } from 'react';
import { Menu } from 'antd';
import menuList from '../../config/menuConfig.js';
import './navleft.less';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
class Navleft extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
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
            }
            return  <Menu.Item key={item.key} >
                        { item.title }   
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
                <Menu mode="vertical" theme="dark">
                    {this.state.menuTreeCode}
                </Menu>
            </div>
        );
    }
}

export default Navleft;
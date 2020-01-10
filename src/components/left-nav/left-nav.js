import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import logImg from '../../assets/images/logo.png'
import './left-nav.less'
import {Menu, Icon} from 'antd';

const {SubMenu} = Menu;

/**
 * 左侧导航
 * */
class LeftNav extends Component {
    render() {
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logImg}/>
                    <h4>ADMIN 后台管理系统</h4>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="home"/>
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                <Icon type="appstore"/>
                <span>商品</span>
              </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Icon type="bars" />
                            <span>品类管理</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="tool" />
                            <span>商品管理</span></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2">
                        <Icon type="user" />
                        <span>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="solution" />
                        <span>角色管理 </span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default LeftNav;

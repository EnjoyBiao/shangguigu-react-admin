import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav'
import Header from  '../../components/header/header'
const { Footer, Sider, Content } = Layout;
class Admin extends Component {
    render() {
        if (!memoryUtils.user.username) {
            //没有登录，要跳转到登录界面,Redirect用在render中
            return <Redirect to='/login'></Redirect>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider><LeftNav/></Sider>
                <Layout>
                    <Header></Header>
                    <Content>Content</Content>
                    <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器， 可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;

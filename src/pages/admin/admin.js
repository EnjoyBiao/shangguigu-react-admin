import React, {Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav'
import Header from  '../../components/header/header'
import Home from '../../pages/hone/home'
import Category from  '../../pages/category/category'
import Product from '../../pages/product/product'
import Role from '../../pages/role/role'
import User from '../../pages/user/user'
import Bar from '../../pages/chars/bar'
import Line from  '../../pages/chars/line'
import Pie from  '../../pages/chars/pie'
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
                    <Content style={{backgroundColor:"#ffffff"}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home' />
                        </Switch>

                    </Content>
                    <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器， 可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;
/**
 * Switch：
 *   用拿到的路径一个一个的去匹配，如果匹配不到就是用
 *  <Redirect to='/home' />
 * */

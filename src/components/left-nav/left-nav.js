import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom'
import logImg from '../../assets/images/logo.png'
import './left-nav.less'
import {Menu, Icon} from 'antd';
import menuList from '../../config/menuCongif'

const {SubMenu} = Menu;

/**
 * 左侧导航
 * */
class LeftNav extends Component {
    constructor(props){
        super(props)
    }
    /**
     * 根据menu的数据生成对应的标签数组
     * map（）实现
     * */
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                     <span>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                    </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }


        })
    }
    /**
     * 根据menu的数据生成对应的标签数组
     * reduce（）实现
     * */
    getMenuNodes2= (menuList)=>{
        // 得到当前请求的 path
        const path = this.props.location.pathname
         return menuList.reduce((pre,item)=>{
             if (!item.children) {
                 pre.push((
                     <Menu.Item key={item.key}>
                         <Link to={item.key}>
                             <Icon type={item.icon}/>
                             <span>{item.title}</span>
                         </Link>
                     </Menu.Item>
                 ))
             }else{

                 // 如果当前请求路由与当前菜单的某个子菜单的 key 匹配, 将菜单的 key 保存为 openKey;为了实现刷新的时候，能展开之前选中的子菜单
                  if(item.children.find(cItem => path.indexOf(cItem.key)===0)) { this.openKey = item.key }
                         pre.push((
                     <SubMenu
                         key={item.key}
                         title={
                             <span>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                    </span>
                         }
                     >
                         {this.getMenuNodes2(item.children)}
                     </SubMenu>
                 ))
             }

             return pre
         },[])
    }
    /*在第一次 render()之前执行一次 一般可以在此同步为第一次 render()准备数据 */
    componentWillMount() {
        // this.menuNodes = this.getMenuNodes(menuList)
        this.menuNodes = this.getMenuNodes2(menuList)
    }

    render() {
        // 得到当前请求路径, 作为选中菜单项的 key
        //下面selectedKeys，动态显示匹配到的路由
        const path = this.props.location.pathname
        const  openKey=this.openKey
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logImg}/>
                    <h4>ADMIN 后台管理系统</h4>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {/*{this.getMenuNodes2(menuList)}*/}
                    { this.menuNodes}
                </Menu>
            </div>
        );
    }
}

export default  withRouter(LeftNav) ;
/**
 *把一个非路由组件变成一个路由组件
 *withRouter: 高阶组件: 包装非路由组件返回一个包装后的新组件, 新组件会向被包装组件传递 history/location/match 属性
 * */

import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import {Form, Icon, Input, Button} from 'antd';
import {reqLogin} from '../../api'
import './login.less'
import logoImg from '../../assets/images/logo.png'
import {message} from "antd";
import memoryUtils from '../../utils/memoryUtils'
import storeUtils from  '../../utils/storageUtils'
const Item = Form.Item //这种写法只能写在所有的import之后
class Login extends Component {
    handleSubmit = (event) => {
        //阻止默认
        event.preventDefault()
        //对所有的输入进行验证
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username, password} = values
                const result = await reqLogin(username, password);//使用await,简化promise的使用，不用在使用then()。直接返回promise异步执行结果的value数据
               // result.status == 0 ? message.success('登录成功') :message.error(result.message)
                if(result.status == 0){
                    message.success('登录成功')
                    //两种保存方式
                    memoryUtils.user=result.data
                    storeUtils.saveUser(result.data)
                    this.props.history.replace('/')//不能需要回退到登录页面，所以不用push
                }else{
                    message.error(result.message)
                }
            }
        });
        // //得到form对象
        // const from=this.props.form;
        // //得到输入数据
        // const values= from.getFieldsValue()
    }
    /**
     * 自定义校验密码
     * 必须调用callback
     * callback（）验证通过
     * callback（‘xxxx’） 不通过
     * */
    validatePwd = (rule, value, callback) => {
        !value && callback('密码不能为空')
        value.length < 4 && callback('密码必须大于4位')
        value.length > 12 && callback('密码必须小于12位')
        !(/^[a-zA-Z0-9_]+$/.test(value)) && callback('请使用英文、数字或下划线')
        callback()
    }

    render() {
        //判断用户是否登录，如果已经登录过就直接跳转
        const user=storeUtils.getUser()
        if (user.username) {
            return <Redirect to="/"></Redirect>
        }

        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logoImg} alt="logimg"/>
                    <h1>MY ADEMIN:后台管理系统(Rreact)</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                //生命试验证，就是用别人写好了的，
                                rules: [
                                    {required: true, whitespace: true, message: '请输入用户名!'},
                                    {min: 4, message: '用户名至少4位!'},
                                    {max: 12, message: '用户名最多12位!'},
                                    {pattern: /^[a-zA-Z0-9_]+$/, message: '请使用英文、数字或下划线!'},
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="用户名"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                //还可以自定义校验
                                rules: [{validator: this.validatePwd}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }
}

/**
 * 高阶函数:
 * 特性：1.接受函数类型的参数
 *       2.接受函数类型的参数
 *   常见的函数：定时器，forEach,promise 等
 *    意义：更加具有功能性
 * create,返回的是个函数
 *
 * 高阶组件:
 * 1.本质是一个函数。
 * 2.接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
 * 意义：用来扩展组件的功能
 * 返回的是个组件
 *
 *Form.create 包装的组件将会自带 this.props.form 属性，就可以方便的拿到表单数据
 * */
const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(Login);
export default WrappedNormalLoginForm;
/**
 * 1.前台表单验证
 * 2.收集输入
 *
 *
 * */

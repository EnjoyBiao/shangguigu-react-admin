import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin'
class App extends Component {
    render() {
        return (
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/' component={Admin} />
                    </Switch>
                </BrowserRouter>
        );
    }
}

export default App;
/**
 * BrowserRouter:路由包裹器
 * Switch：路由选择，只是其中匹配一个
 *
 * */

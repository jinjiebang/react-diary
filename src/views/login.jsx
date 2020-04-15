import React from 'react'
import { Link } from 'react-router-dom'
import { List, InputItem, Button, Toast } from 'antd-mobile'
import axios from '../utils/request'
import '../styles/login.css'
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }
    async onLogin() {
        const { email, password } = this.state;
        console.log('login',email,password)
        const res = await axios.post('user/login', {
            email,
            password
        })
        localStorage.setItem('user', res.data.user)
        Toast.success('登录成功', 1.5, _ => {
            // this.props.history.push('/index')
        })
    }
    onChangeEmail(email) {
        this.setState({
            email
        })
    }
    onChangePassword(password) {
        this.setState({
            password
        })
    }
    render() {
        return (
            <div className="login-container">
                <div className="logo">
                    <svg className='icon'>
                        <use href="#icon-bijiben"></use>
                    </svg>
                    <h1>轻记</h1>
                </div>
                <div className="login-input">
                    <List>
                        <InputItem type="text" clear={true} onChange={this.onChangeEmail}>邮箱</InputItem>
                        <InputItem type="password" clear={true} onChange={this.onChangePassword}>密码</InputItem>
                    </List>
                </div>
                <div className="btn-wrap">
                    <Button type="primary" onClick={this.onLogin}>登录</Button>
                    没有账号?
                    <Link to="/register" className="btn-link" >注册</Link>
                </div>
            </div>

        );
    }
}
export default Login
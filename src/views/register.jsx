import React from 'react'
import { Link } from 'react-router-dom'
import { List, InputItem, Button, Toast } from 'antd-mobile'
import axios from '../utils/request'
import '../styles/login.css'
class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            nickname: '',
            password1: '',
            password2: '',
        }
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeNickname = this.onChangeNickname.bind(this)
        this.onChangePassword1 = this.onChangePassword1.bind(this)
        this.onChangePassword2 = this.onChangePassword2.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }
    async onRegister() {
        const { email, nickname, password1, password2} = this.state;
        await axios.post('user/register',{
            email,
            nickname,
            password1,
            password2
        })
        Toast.success('注册成功', 2, () => {
            this.props.history.push('/login')
        })
    }
    onChangeEmail(email) {
        this.setState({
            email
        })
    }
    onChangeNickname(nickname) {
        this.setState({
            nickname
        })
    }
    onChangePassword1(password1) {
        this.setState({
            password1
        })
    }
    onChangePassword2(password2) {
        this.setState({
            password2
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
                        <InputItem type="text" clear={true} onChange={this.onChangeNickname}>昵称</InputItem>
                        <InputItem type="password" clear={true} onChange={this.onChangePassword1}>密码</InputItem>
                        <InputItem type="password" clear={true} onChange={this.onChangePassword2}>再次输入</InputItem>
                    </List>
                </div>
                <div className="btn-wrap">
                    <Button type="primary" onClick={this.onRegister}>注册</Button>
                    <Link to="/login" className="btn-link" >已有账号去登录</Link>
                </div>
            </div>

        );
    }
}
export default Register
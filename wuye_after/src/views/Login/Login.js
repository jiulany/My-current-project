import React, { Component } from 'react';
import { Row, Col, message, Button } from 'antd';
import Cookies from 'js-cookie'
import http from '../../api/http';
import './Login.css'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false
        }
    }
    componentDidMount() {
        if (Cookies.get('account') !== '' || Cookies.get('password') !== '') {
            this.setState({
                account: Cookies.get('account'),
                password: Cookies.get('password'),
                checkbox: true
            })
        }
    }
    switchCheck = (p, e) => {
        this.setState(pre => ({
            checkbox: p
        }))
        if (p === true) {
            Cookies.set('account', this.state.account, { expires: 30 });
            Cookies.set('password', this.state.password, { expires: 30 });
        } else {
            Cookies.set('account', '', { expires: 30 });
            Cookies.set('password', '', { expires: 30 });
        }
    }
    inputValue = (p, e) => {
        if (p === 'account') {
            this.setState({
                account: e.currentTarget.value
            })
        }
        if (p === 'password') {
            this.setState({
                password: e.currentTarget.value
            })
        }
    }
    sumbit = () => {
        this.setState({
            loading:true
        })
        localStorage.setItem("token","")
        http('/login/token', {
            method: 'POST', data: {
                username: this.state.account,
                password: this.state.password
            }
        }).then(res => {
            localStorage.setItem("token",res.data.token)
            http('/login/user_info', {
                method: 'POST', data: {}
            }).then(res => {
                Cookies.set('user_id', res.data.id, { expires: 30 });
                // Cookies.set('community_id', res.data[0].id, { expires: 30 });
                Cookies.set('name', res.data.name, { expires: 30 });
                Cookies.set('username', res.data.username, { expires: 30 });
                Cookies.set('property_id', res.data.property_id, { expires: 30 });
                Cookies.set('login','true', { expires: 30 });
                setTimeout(() => {
                    this.setState({
                        loading:false
                    })
                    this.props.history.push('/ControlPage')
                }, 2000);
            }).catch(res => {
            })
            
        }).catch(res => {
                message.error(res.msg);
            setTimeout(() => {
                this.setState({
                    loading:false
                })
            }, 1000);
        })
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className='login'>
                <Col span={10} offset={14}>
                    <Col span={24} className='login-itm'>
                        <Col span={12} className='login-inp'>
                            <Col span={2} className='login-ico'>
                                <img src={require('../../images/login_ico0.png')} alt="" />
                            </Col>
                            <Col offset={1} span={21}><input type="text" value={this.state.account} onInput={(e) => this.inputValue('account', e)} placeholder='请输入账号' /></Col>
                        </Col>
                    </Col>
                    <Col span={24} className='login-itm'>
                        <Col span={12} className='login-inp'>
                            <Col span={2} className='login-ico'>
                                <img src={require('../../images/login_ico1.png')} alt="" />
                            </Col>
                            <Col offset={1} span={21}><input type="password" value={this.state.password} maxLength='6' onInput={(e) => this.inputValue('password', e)} placeholder='请输入账号' /></Col>
                        </Col>
                    </Col>
                    <Col span={24} className='login-itm-t0'>
                        <Col span={12} className='login-inp'>
                            <Col span={2} className='login-ico'>
                                {
                                    this.state.checkbox === true ? (
                                        <img className='login-chek' onClick={(e) => this.switchCheck(false, e)} src={require('../../images/checkbox_sle.png')} alt="" />
                                    ) : (
                                            <img className='login-chek' onClick={(e) => this.switchCheck(true, e)} src={require('../../images/checkbox_no.png')} alt="" />
                                        )
                                }
                            </Col>
                            <Col offset={1} span={21} style={{ color: '#b7b8be' }}>记住密码</Col>
                        </Col>
                    </Col>
                    <Col span={24} className='login-itm'>
                        <Col span={12}>
                            <Button loading={this.state.loading}  onClick={this.sumbit} className='login-btn' type="primary" shape="round"  >
                                登录
                            </Button>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

export default Login;

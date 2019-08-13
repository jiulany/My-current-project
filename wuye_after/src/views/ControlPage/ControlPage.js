import React, { Component } from 'react';
import { Row, Col, Modal } from 'antd';
import Cookies from 'js-cookie'
// import http from '../../api/http';
import './ControlPage.css'
const { confirm } = Modal;
class ControlPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: Cookies.get('name'),
            username: Cookies.get('username')
        }
    }
    componentDidMount() {
    }
    componentWillUpdate(nextSprops) {

    }
    componentWillMount(nextSprops) {
        if (Cookies.get('login') === 'false' || Cookies.get('login') === undefined) {
            console.log(Cookies.get('login'))
            this.props.history.push('/index/Login')
            this.setState({
                switch_route: false
            })
        } else {
            this.setState({
                switch_route: true
            })
        }
    }
    signOut = () => {
        let _this = this
        confirm({
            title: '',
            okText: '确认',
            cancelText: '取消',
            content: '确定要退出系统吗？',
            onOk() {
                Cookies.set('login', 'false', { expires: 30 });
                Cookies.set('account', '', { expires: 30 });
                Cookies.set('password', '', { expires: 30 });
                _this.props.history.push('/index/Login')
            },
            onCancel() {
            },
        });
    }
    todengJj = () => {
        this.props.history.push('/index/ye_list/add_owner')
    }
    todaiBan = () => {
        this.props.history.push('/index/repair_manage')
    }
    toSpreadPay = () => {
        sessionStorage.setItem('isFromInx', "true")
        this.props.history.push('/index/water_list')
    }
    toGonggao=()=>{
        this.props.history.push('/index/notice_list')
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className='contralpage' >
                <Col className='controlpage-top' span={24}>
                    <Row className='controlpage-he' align='middle' type='flex'>
                        <Col span={2} className='controlpage-nm'>脱狗家宝物业</Col>
                        <Col span={14} className='controlpage-tm'>2019年6月25日</Col>
                        <Col span={8}>
                            <Row align='middle' type='flex'>
                                <Col span={10} className="controlpage-status">
                                    <img className="controlpage-icon" src={require('../../images/control_ico0.png')} alt="" />
                                    当前登录用户：{this.state.username}
                                </Col>
                                <Col span={1} className="controlpage-status">
                                    <div className="controlpage-division">
                                    </div>
                                </Col>
                                <Col span={8} className="controlpage-status">
                                    <img className="controlpage-icon" src={require('../../images/control_ico1.png')} alt="" />
                                    角色：{this.state.name}
                                </Col>
                                <Col span={1} className="controlpage-status">
                                    <div className="controlpage-division">
                                    </div>
                                </Col>
                                <Col span={4} className="controlpage-status" style={{ cursor: 'pointer' }} onClick={this.signOut}>
                                    <img className="controlpage-icon" src={require('../../images/control_ico2.png')} alt="" />
                                    {"退出"}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Col className='controlpage-huantt' span={24}>欢迎来到脱狗家宝物业管理平台</Col>
                </Col>

                <Col className='controlpage-bot' span={24}>
                    <Row justify='space-between' type='flex'>
                        <Col span={4}>
                            <Row justify='center' type='flex' onClick={this.todengJj}>
                                <Col span={22} className='controlpage-boxbg0 controlpage-bot-box'>
                                    <Col className='controlpage-bot-dj' span={24}>快速登记</Col>
                                    <Col className='controlpage-bot-tp' span={24}><img src={require('../../images/dengji.png')} alt="" /></Col>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <Row justify='center' type='flex'>
                                <Col span={22} className='controlpage-boxbg1 controlpage-bot-box'>
                                    <Col className='controlpage-bot-dj' span={24}>快速查账</Col>
                                    <Col className='controlpage-bot-tp' span={24}><img src={require('../../images/chazhang.png')} alt="" /></Col>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <Row justify='center' type='flex' onClick={this.todaiBan}>
                                <Col span={22} className='controlpage-boxbg2 controlpage-bot-box'>
                                    <Col className='controlpage-bot-dj' span={24}>待办事项</Col>
                                    <Col className='controlpage-bot-tp' span={24}><img style={{ height: '100px' }} src={require('../../images/xuexi.png')} alt="" /></Col>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <Row justify='center' type='flex' onClick={this.toSpreadPay}>
                                <Col span={22} className='controlpage-boxbg3 controlpage-bot-box '>
                                    <Col className='controlpage-bot-dj' span={24}>快速缴费</Col>
                                    <Col className='controlpage-bot-tp' span={24}><img style={{ height: '100px' }} src={require('../../images/jifei.png')} alt="" /></Col>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <Row justify='center' type='flex' onClick={this.toGonggao}>
                                <Col span={22} className=' controlpage-boxbg4 controlpage-bot-box'>
                                    <Col className='controlpage-bot-dj' span={24}>小区公告</Col>
                                    <Col className='controlpage-bot-tp' span={24}><img style={{ height: '100px' }} src={require('../../images/gonggao.png')} alt="" /></Col>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Col>
            </Row>
        )
    }
}

export default ControlPage;

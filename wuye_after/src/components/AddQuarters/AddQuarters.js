import React, { Component } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import Cookies from 'js-cookie'
import http from '../../api/http';
//css样式在home.css

class AddQuarters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            is_xiugai: false,
            image_url: [] //省份证正反index=0正，1为反
        }
    }
    componentDidMount() {
        if (this.props.location.query) {
            let query = this.props.location.query
            if (query.type === 1) {
                http('/community/community_one', {
                    method: 'POST', data: {
                        id: query.update_id
                    }
                }).then(res => {
                    this.setState({
                        is_xiugai: true,
                        community_name: res.data[0].community_name,
                        community_address: res.data[0].community_address,
                        community_developers: res.data[0].community_developers,
                        community_mobile: res.data[0].community_mobile,
                        community_person: res.data[0].community_person,
                        community_person_mobile: res.data[0].community_person_mobile,
                        water_fee: res.data[0].water_fee,
                        electricity_fee: res.data[0].electricity_fee,
                        gas_fee: res.data[0].gas_fee,
                        property_fee:res.data[0].property_fee,
                        garbage_fee:res.data[0].garbage_fee,
                    })
                }).catch(res => {
                    message.success(res.msg);
                    this.setState({
                        is_xiugai: true
                    })
                })
            }
        }
    }
    inputValue = (p, e) => {
        if (p === 'community_name') {
            this.setState({
                community_name: e.currentTarget.value
            })
        }
        if (p === 'community_address') {
            this.setState({
                community_address: e.currentTarget.value
            })
        }
        if (p === 'community_developers') {
            this.setState({
                community_developers: e.currentTarget.value
            })
        }
        if (p === 'community_mobile') {
            this.setState({
                community_mobile: e.currentTarget.value
            })
        }
        if (p === 'community_person') {
            this.setState({
                community_person: e.currentTarget.value
            })
        }
        if (p === 'community_person_mobile') {
            this.setState({
                community_person_mobile: e.currentTarget.value
            })
        }
        if (p === 'water_fee') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                water_fee: re
            })
        }
        if (p === 'electricity_fee') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                electricity_fee: re
            })
        }
        if (p === 'gas_fee') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                gas_fee: re
            })
        }
        if (p === 'property_fee') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                property_fee: re
            })
        }
        if (p === 'garbage_fee') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                garbage_fee: re
            })
        }
    }
    cancelAdd = () => {
        this.props.history.go(-1)
    }
    handleXiuGai = () => {
        let _thisst = this.state
        if (_thisst.community_name && _thisst.community_address && _thisst.community_developers
            && _thisst.community_mobile && _thisst.community_person && _thisst.community_person_mobile !== -1) {
            http('/community/community_upd', {
                method: 'POST',
                data: {
                    id: this.props.location.query.update_id,
                    community_name: _thisst.community_name,
                    community_address: _thisst.community_address,
                    community_developers: _thisst.community_developers,
                    community_mobile: _thisst.community_mobile,
                    community_person: _thisst.community_person,
                    water_fee: _thisst.water_fee,
                    electricity_fee: _thisst.electricity_fee,
                    gas_fee: _thisst.gas_fee,
                    property_fee: _thisst.property_fee,
                    garbage_fee: _thisst.garbage_fee,
                    community_person_mobile: _thisst.community_person_mobile,
                }
            }).then(res => {
                message.success(res.msg);
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    community_name: _thisst.community_name,
                    community_address: _thisst.community_address,
                    community_developers: _thisst.community_developers,
                    community_mobile: _thisst.community_mobile,
                    community_person: _thisst.community_person,
                    water_fee: '',
                    electricity_fee: '',
                    gas_fee: '',
                    property_fee: '',
                    garbage_fee: '',
                    community_person_mobile: _thisst.community_person_mobile,
                })
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    handleUpload = () => {
        let _thisst = this.state
        if (_thisst.community_name && _thisst.community_address && _thisst.community_developers && _thisst.community_mobile && _thisst.community_person && _thisst.community_person_mobile !== '') {
            http('/community/community_save', {
                method: 'POST',
                data: {
                    community_name: _thisst.community_name,
                    community_address: _thisst.community_address,
                    community_developers: _thisst.community_developers,
                    community_mobile: _thisst.community_mobile,
                    community_person: _thisst.community_person,
                    community_person_mobile: _thisst.community_person_mobile,
                    water_fee: _thisst.water_fee,
                    electricity_fee: _thisst.electricity_fee,
                    gas_fee: _thisst.gas_fee,
                    property_fee: _thisst.property_fee,
                    garbage_fee: _thisst.garbage_fee,
                    admin_id: Cookies.get('user_id'),
                }
            }).then(res => {
                message.success(res.msg);
                this.setState({
                    community_name: '',
                    community_address: '',
                    community_developers: '',
                    community_mobile: '',
                    community_person: '',
                    water_fee: '',
                    electricity_fee: '',
                    gas_fee: '',
                    property_fee: '',
                    garbage_fee: '',
                    community_person_mobile: '',
                })
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    community_name: '',
                    community_address: '',
                    community_developers: '',
                    community_mobile: '',
                    community_person: '',
                    water_fee: '',
                    electricity_fee: '',
                    gas_fee: '',
                    property_fee: '',
                    garbage_fee: '',
                    community_person_mobile: '',
                })
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="add">
                <Col span={24} className="add-it">
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>小区名字：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入小区名字" value={this.state.community_name} onChange={(e) => this.inputValue('community_name', e)} />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>小区地址：</Col>
                            <Col span={18}><Input placeholder="请输入小区地址" value={this.state.community_address} onChange={(e) => this.inputValue('community_address', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>开发地址：</Col>
                            <Col span={18}><Input placeholder="请输入开发地址" value={this.state.community_developers} onChange={(e) => this.inputValue('community_developers', e)} />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>服务中心电话：</Col>
                            <Col span={18}><Input placeholder="请输入电话" value={this.state.community_mobile} onChange={(e) => this.inputValue('community_mobile', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>物业中心负责人：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入负责人姓名" value={this.state.community_person} onChange={(e) => this.inputValue('community_person', e)} />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>负责人电话：</Col>
                            <Col span={18}><Input placeholder="请输入电话" value={this.state.community_person_mobile} onChange={(e) => this.inputValue('community_person_mobile', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>水费：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入水费" value={this.state.water_fee} onChange={(e) => this.inputValue('water_fee', e)} />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>电费：</Col>
                            <Col span={18}><Input placeholder="请输入电费" value={this.state.electricity_fee} onChange={(e) => this.inputValue('electricity_fee', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>气费：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入气费" value={this.state.gas_fee} onChange={(e) => this.inputValue('gas_fee', e)} />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>物业费：</Col>
                            <Col span={18}><Input placeholder="请输入物业费" value={this.state.property_fee} onChange={(e) => this.inputValue('property_fee', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>垃圾费：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入垃圾费" value={this.state.garbage_fee} onChange={(e) => this.inputValue('garbage_fee', e)} />
                            </Col>
                        </Col>
                    </Col>
                    <Col span={24} className="add-ctrl">
                        <Col span={10}>
                            <Col span={19} offset={5}>
                                <Col span={11} className="add-ctrl-it" onClick={this.cancelAdd}><Button>取消</Button></Col>
                                {
                                    this.state.is_xiugai ?
                                        <Col span={11} className="add-ctrl-it" onClick={this.handleXiuGai}><Button type="primary">修改</Button></Col> :
                                        <Col span={11} className="add-ctrl-it" onClick={this.handleUpload}><Button type="primary">提交</Button></Col>
                                }
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

export default AddQuarters;

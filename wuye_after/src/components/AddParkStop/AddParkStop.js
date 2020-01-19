import React, { Component } from 'react';
import { Row, Col, Input, Button, Select, message, DatePicker } from 'antd';
import http from '../../api/http';
import Cookies from 'js-cookie'
import moment from 'moment';
const { Option } = Select;
const { MonthPicker } = DatePicker;
//css样式在home.css

class AddParkStop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            image_url: [], //省份证正反index=0正，1为反
            month_number: 1,
            is_clck:true,
            is_slestatus:false
        }
    }
    componentWillMount(){
        if (this.props.location.query.id_xiu === 'true') {
            let query = this.props.location.query
            if (query.type === 1) {
                this.setState({
                    is_xiugai: true
                })
                http('/payment/show', {
                    method: 'get', data: {
                        id: query.update_id,
                        cost_type: query.cost_type
                    }
                }).then(res => {
                    this.setState({
                        id:res.data.id,
                        cost: res.data.total_price,
                        pay_status: res.data.status,
                        date: res.data.year + '-' + res.data.month,
                        pay_type: res.data.pay_type,
                        park_status: res.data.park_status,
                        tenant_name: res.data.tenant_name,
                        park_name: res.data.park_region+res.data.park_number,
                        tenant_mobile: res.data.tenant_mobile,
                        car_number: res.data.car_number,
                        // month_number: res.data.month_number
                    })
                    if (res.data.status === 1) {
                        this.setState({
                            is_slestatus: true
                        })
                    }
                }).catch(res => {
                    message.error(res.msg);
                })
            }
        }
        if (this.props.location.query.id_xiu === 'false') {
            let query = this.props.location.query
            http('/community/community_price', {
                method: 'get', data: {
                    community_id: Cookies.get('community_id')
                }
            }).then(res => {
                if (query.cost_type === 4) {
                    this.setState({
                        unit_price: res.data.property_fee,
                        cost_type: query.cost_type
                    })
                }
                if (query.cost_type === 5) {
                    this.setState({
                        unit_price: res.data.garbage_fee,
                        cost_type: query.cost_type
                    })
                }
            }).catch(res => {
                message.error(res.msg);
            })
        }
    }
    cancelAdd = () => {
        this.props.history.go(-1)
    }
    seleCostType = (e) => {
        this.setState({
            cost_type: e
        })
    }
    selePayStatus = (e) => {
        if (e === 0) {
            this.setState({
                pay_status: e,
                pay_type: 0
            })
        }
        if (e === 1) {
            this.setState({
                pay_status: e,
                pay_type: 1
            })
        }
    }
    selePayType = (e) => {
        if (e === 0) {
            this.setState({
                pay_type: e,
                pay_status: 0
            })
        } else {
            this.setState({
                pay_type: e,
                pay_status: 1
            })
        }
    }
    handleUpload = () => {
        let _thisst = this.state
        if(this.state.is_clck){
            this.setState({
                is_clck:false
            })
        if (_thisst.tenant_name !== ''
            && _thisst.car_number !== ''
            && _thisst.park_name !== ''
            && _thisst.month_number !== ''
            && _thisst.tenant_mobile !== ''
            && _thisst.park_status !== ''
            && _thisst.status !== ''
            && _thisst.pay_type !== ''
            && _thisst.total_price !== ''
            && _thisst.date !== ''
        ) {
            http('/payment/create', {
                method: 'POST',
                data: {
                    park_id: _thisst.id,
                    date: _thisst.date,
                    type: 6,
                    status: _thisst.pay_status,
                    pay_type: _thisst.pay_type,
                    park_status: _thisst.park_status,
                    total_price: _thisst.cost,
                    tenant_name: _thisst.tenant_name,
                    park_name: _thisst.park_name,
                    tenant_mobile: _thisst.tenant_mobile,
                    car_number: _thisst.car_number,
                    num: _thisst.month_number
                }
            }).then(res => {
                message.success(res.msg)
                this.setState({
                    house_number: '',
                    username: '',
                    is_clck:true
                })
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    house_number: '',
                    username: '',
                    is_clck:true
                })
            })
        } else {
            this.setState({
                is_clck:true
            })
            message.error('输入不能为空，请检查！');
        }
    }
    }
    inputValue = (p, e) => {
        if (p === 'tenant_name') {
            this.setState({
                tenant_name: e.currentTarget.value
            })
        }
        if (p === 'park_name') {
            this.setState({
                park_name: e.currentTarget.value
            })
        }
        if (p === 'tenant_mobile') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                tenant_mobile: re
            })
        }
        if (p === 'month_number') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                month_number: re
            })
        }
        if (p === 'car_number') {
            this.setState({
                car_number: e.currentTarget.value
            })
        }
        if (p === 'cost') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                cost: re
            })
        }
    }
    handleXiuGai = () => {
        let _thisst = this.state
        if(this.state.is_clck){
            this.setState({
                is_clck:false
            })
        if (_thisst.tenant_name !== ''
        && _thisst.car_number !== ''
        && _thisst.park_name !== ''
        && _thisst.month_number !== ''
        && _thisst.tenant_mobile !== ''
        && _thisst.park_status !== ''
        && _thisst.status !== ''
        && _thisst.pay_type !== ''
        && _thisst.total_price !== ''
        && _thisst.date !== ''
        ) {
            http('/payment/update', {
                method: 'POST',
                data: {
                    id: _thisst.id,
                    date: _thisst.date,
                    type: 6,
                    status: _thisst.pay_status,
                    pay_type: _thisst.pay_type,
                    park_status: _thisst.park_status,
                    total_price: _thisst.cost,
                    tenant_name: _thisst.tenant_name,
                    park_name: _thisst.park_name,
                    tenant_mobile: _thisst.tenant_mobile,
                    car_number: _thisst.car_number,
                    num: _thisst.month_number
                }
            }).then(res => {
                this.setState({
                    is_clck:true
                })
                message.success(res.msg);
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    is_clck:true
                })
            })
        } else {
            this.setState({
                is_clck:true
            })
            message.error('输入不能为空，请检查！');
        }
    }
    }
    blurGetChew = (e) => {
        http('park/park_find', {
            method: 'get',
            data: {
                park_name: this.state.park_name
            }
        }).then(res => {
            this.setState({
                tenant_name: res.data.tenant_name,
                tenant_mobile: res.data.tenant_mobile,
                car_number: res.data.car_number,
                park_status: res.data.park_status,
                id: res.data.id
            })
        }).catch(res => {
            message.error(res.msg);
            this.setState({
                tenant_name: "",
                tenant_mobile: "",
                car_number: "",
                park_status: "",
                id: ''
            })
        })
    }
    payMonth = (e) => {
        this.setState({
            date: moment(e).format('YYYY-MM')
        })
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="add">
                <Col span={24} className="add-it">
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>车主名：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入车主名" disabled value={this.state.tenant_name} onChange={(e) => this.inputValue('tenant_name', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>车位号：</Col>
                            <Col span={18}><Input placeholder="车位号" onBlur={this.blurGetChew} value={this.state.park_name} onChange={(e) => this.inputValue('park_name', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>车主电话：</Col>
                            <Col span={18}><Input value={this.state.tenant_mobile} onChange={(e) => this.inputValue('tenant_mobile', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>车牌号：</Col>
                            <Col span={18}><Input placeholder="车牌号" value={this.state.car_number} onChange={(e) => this.inputValue('car_number', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>车位状态：</Col>
                            <Col span={18}>
                                <Select disabled style={{ width: '100%' }} placeholder="请选择车位状态" allowClear={true} value={this.state.park_status} onChange={this.seleParlStatus}>
                                    <Option value={1}>闲置</Option>
                                    <Option value={2}>租用</Option>
                                    <Option value={3}>自用</Option>
                                    <Option value={4}>人防</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>费用：</Col>
                            <Col span={18}><Input placeholder="请输入费用" value={this.state.cost} onChange={(e) => this.inputValue('cost', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>付费状态：</Col>
                            <Col span={18}>
                                <Select disabled={this.state.is_slestatus} style={{ width: '100%' }} placeholder="请选择付费状态" allowClear={true} value={this.state.pay_status} onChange={this.selePayStatus}>
                                    <Option value={0}>未付款</Option>
                                    <Option value={1}>已付款</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>支付方式 ：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} placeholder="请选择支付方式" allowClear={true} value={this.state.pay_type} onChange={this.selePayType}>
                                   {
                                       !this.state.is_slestatus&&
                                       <Option value={0}>未支付</Option>
                                   }
                                    <Option value={1}>微信支付</Option>
                                    <Option value={2}>支付宝</Option>
                                    <Option value={3}>现金</Option>
                                    <Option value={4}>在线支付(银行卡支付)</Option>
                                </Select>
                            </Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>缴费月份：</Col>
                            <Col span={18}>
                                {
                                    this.state.is_xiugai ? <MonthPicker value={moment(this.state.date, 'YYYY-MM')} onChange={this.payMonth} placeholder="选择缴费月份" /> :
                                        <MonthPicker onChange={this.payMonth} placeholder="选择缴费月份" />
                                }
                            </Col>
                        </Col>
                        {!this.state.is_xiugai &&( 
                        <Col span={8} offset={1}>
                            <Col span={6}>缴费数量：</Col>
                            <Col span={18}><Input value={this.state.month_number} onChange={(e) => this.inputValue('month_number', e)} /></Col>
                        </Col>
                        )}
                    </Col>
                    <Col span={24} className="add-ctrl">
                        <Col span={7}>
                            <Col span={19} offset={5}>
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

export default AddParkStop;

import React, { Component } from 'react';
import { Row, Col, Input, Button, Select, message } from 'antd';
import http from '../../api/http';
const { Option } = Select;
//css样式在home.css

class AddPay1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            image_url: [] //省份证正反index=0正，1为反
        }
    }
    componentDidMount() {
        if (this.props.location.query) {
            let query = this.props.location.query
            if (query.type === 1) {
                http('/pay/property_render', {
                    method: 'POST', data: {
                        id: query.update_id,
                        cost_type: query.cost_type
                    }
                }).then(res => {
                    this.setState({
                        is_xiugai: true,
                        house_number: res.data[0].house_number,
                        username: res.data[0].username,
                        house_area: res.data[0].house_area,
                        unit_price: res.data[0].unit_price,
                        cost_type: res.data[0].cost_type,
                        month_number: res.data[0].month_number,
                        pay_type: res.data[0].pay_type,
                        pay_status: res.data[0].pay_status,
                        cost: res.data[0].cost
                    })
                }).catch(res => {
                    message.success(res.msg);
                    this.setState({
                        is_xiugai: true,
                        house_number: res.data[0].house_number,
                        username: res.data[0].username,
                        house_area: res.data[0].house_area,
                        unit_price: res.data[0].unit_price,
                        cost_type: res.data[0].cost_type,
                        month_number: res.data[0].month_number,
                        pay_type: res.data[0].pay_type,
                        pay_status: res.data[0].pay_status,
                        cost: res.data[0].cost
                    })
                })
            }
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
        if (_thisst.house_number !== ''
            && _thisst.username !== ''
            && _thisst.house_area !== ''
            && _thisst.unit_price !== ''
            && _thisst.cost_type !== ''
            && _thisst.month_number !== ''
            && _thisst.pay_type !== ''
            && _thisst.pay_status !== ''
            && _thisst.cost !== ''
        ) {
            http('/pay/property_save', {
                method: 'POST',
                data: {
                    house_number: _thisst.house_number,
                    username: _thisst.username,
                    house_area: _thisst.house_area,
                    unit_price: _thisst.unit_price,
                    cost_type: _thisst.cost_type,
                    month_number: _thisst.month_number,
                    pay_type: _thisst.pay_type,
                    pay_status: _thisst.pay_status,
                    cost: _thisst.cost
                }
            }).then(res => {
                message.success(res.msg)
                this.setState({
                    house_number: '',
                    username: '',
                    house_area: '',
                    unit_price: '',
                    month_number: '',
                    cost: ''
                })
                setTimeout(()=>{
                    this.props.history.go(-1)
                },2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    house_number: '',
                    username: '',
                    house_area: '',
                    unit_price: '',
                    month_number: '',
                    cost: ''
                })
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    inputValue = (p, e) => {
        if (p === 'house_number') {
            this.setState({
                house_number: e.currentTarget.value
            })
        }
        if (p === 'username') {
            this.setState({
                username: e.currentTarget.value
            })
        }
        if (p === 'house_area') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                house_area: re
            })
        }
        if (p === 'unit_price') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                unit_price: re
            })
        }
        if (p === 'month_number') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                month_number: re
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
        if ( _thisst.house_number !== ''
        && _thisst.username !== ''
        && _thisst.house_area !== ''
        && _thisst.unit_price !== ''
        && _thisst.cost_type !== ''
        && _thisst.month_number !== ''
        && _thisst.pay_type !== ''
        && _thisst.pay_status !== ''
        && _thisst.cost !== ''
        ) {
            http('/pay/property_update', {
                method: 'POST',
                data: {
                    id:this.props.location.query.update_id,
                    house_number: _thisst.house_number,
                    username: _thisst.username,
                    house_area: _thisst.house_area,
                    unit_price: _thisst.unit_price,
                    cost_type: _thisst.cost_type,
                    month_number: _thisst.month_number,
                    pay_type: _thisst.pay_type,
                    pay_status: _thisst.pay_status,
                    cost: _thisst.cost
                }
            }).then(res => {
                message.success(res.msg);
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
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
                        <Col span={8}>
                            <Col span={6}>房号：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入房号" value={this.state.house_number} onChange={(e) => this.inputValue('house_number', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>户主名：</Col>
                            <Col span={18}><Input placeholder="请输入户主名" value={this.state.username} onChange={(e) => this.inputValue('username', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>房屋面积：</Col>
                            <Col span={18}><Input value={this.state.house_area} onChange={(e) => this.inputValue('house_area', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>单价：</Col>
                            <Col span={18}><Input placeholder="请输入单价" value={this.state.unit_price} onChange={(e) => this.inputValue('unit_price', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>缴费数量：</Col>
                            <Col span={18}>
                                <Input value={this.state.month_number} onChange={(e) => this.inputValue('month_number', e)} />
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
                                <Select style={{ width: '100%' }} placeholder="请选择付费状态" allowClear={true} value={this.state.pay_status} onChange={this.selePayStatus}>
                                    <Option value={0}>未付款</Option>
                                    <Option value={1}>已付款</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>支付方式 ：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} placeholder="请选择支付方式" allowClear={true} value={this.state.pay_type} onChange={this.selePayType}>
                                    <Option value={0}>未支付</Option>
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
                            <Col span={6}>费用类型：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} disabled={this.state.is_xiugai ? true : false} placeholder="请选择费用类型" allowClear={true} value={this.state.cost_type} onChange={this.seleCostType}>
                                    <Option value={4}>物业费</Option>
                                    <Option value={5}>垃圾费</Option>
                                </Select>
                            </Col>
                        </Col>
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

export default AddPay1;

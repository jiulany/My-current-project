import React, { Component } from 'react';
import { Row, Col, Input, Button, Select, message } from 'antd';
import http from '../../api/http';
const { Option } = Select;
//css样式在home.css

class AddPay0 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            is_xiugai: false,
            image_url: [], //省份证正反index=0正，1为反
        }
    }
    componentDidMount() {
        if (this.props.location.query) {
            let query = this.props.location.query
            if (query.type === 1) {
                http('/pay/render', {
                    method: 'POST', data: {
                        id: query.update_id,
                        cost_type: query.cost_type
                    }
                }).then(res => {
                    this.setState({
                        is_xiugai: true,
                        house_number: res.data[0].house_number,
                        username: res.data[0].username,
                        start_number: res.data[0].start_number,
                        end_number: res.data[0].end_number,
                        unit_price: res.data[0].unit_price,
                        cost: res.data[0].cost,
                        pay_status: res.data[0].pay_status,
                        consumption: res.data[0].consumption,
                        cost_type: res.data[0].cost_type,
                        pay_type: res.data[0].pay_type
                    })
                }).catch(res => {
                    message.success(res.msg);
                    this.setState({
                        is_xiugai: true,
                        house_number: res.data[0].house_number,
                        username: res.data[0].username,
                        start_number: res.data[0].start_number,
                        end_number: res.data[0].end_number,
                        unit_price: res.data[0].unit_price,
                        cost: res.data[0].cost,
                        pay_status: res.data[0].pay_status,
                        consumption: res.data[0].consumption,
                        cost_type: res.data[0].cost_type,
                        pay_type: res.data[0].pay_type
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
        if (p === 'start_number') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                start_number: re
            })
        }
        if (p === 'end_number') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                end_number: re
            })
        }
        if (p === 'unit_price') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                unit_price: re
            })
        }
        if (p === 'consumption') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                consumption: re
            })
        }
        if (p === 'cost') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            this.setState({
                cost: re
            })
        }
    }
    handleUpload = () => {
        let _thisst = this.state
        if (_thisst.house_number !== ''
            && _thisst.username !== ''
            && _thisst.start_number !== ''
            && _thisst.end_number !== ''
            && _thisst.unit_price !== ''
            && _thisst.cost_type !== ''
            && _thisst.pay_type !== ''
            && _thisst.consumption !== ''
            && _thisst.pay_status !== ''
            && _thisst.cost !== ''
        ) {
            http('/pay/save', {
                method: 'POST',
                data: {
                    house_number: _thisst.house_number,
                    username: _thisst.username,
                    start_number: _thisst.start_number,
                    end_number: _thisst.end_number,
                    unit_price: _thisst.unit_price,
                    cost: _thisst.cost,
                    pay_status: _thisst.pay_status,
                    consumption: _thisst.consumption,
                    cost_type: _thisst.cost_type,
                    pay_type: _thisst.pay_type
                }
            }).then(res => {
                message.success(res.msg)
                this.setState({
                    house_number: '',
                    username: '',
                    start_number: '',
                    end_number: '',
                    unit_price: '',
                    cost: '',
                    consumption: '',
                })
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    house_number: '',
                    username: '',
                    start_number: '',
                    end_number: '',
                    unit_price: '',
                    cost: '',
                    consumption: '',
                })
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    handleXiuGai = () => {
        let _thisst = this.state
        if (_thisst.house_number !== ''
            && _thisst.username !== ''
            && _thisst.start_number !== ''
            && _thisst.end_number !== ''
            && _thisst.unit_price !== ''
            && _thisst.cost_type !== ''
            && _thisst.pay_type !== ''
            && _thisst.consumption !== ''
            && _thisst.pay_status !== ''
            && _thisst.cost !== ''
        ) {
            http('/pay/update', {
                method: 'POST',
                data: {
                    id: this.props.location.query.update_id,
                    house_number: _thisst.house_number,
                    username: _thisst.username,
                    start_number: _thisst.start_number,
                    end_number: _thisst.end_number,
                    unit_price: _thisst.unit_price,
                    cost: _thisst.cost,
                    pay_status: _thisst.pay_status,
                    consumption: _thisst.consumption,
                    cost_type: _thisst.cost_type,
                    pay_type: _thisst.pay_type
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
                            <Col span={18}><Input placeholder="请输入户主名" maxLength={5} value={this.state.username} onChange={(e) => this.inputValue('username', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>起始数：</Col>
                            <Col span={18}><Input value={this.state.start_number} onChange={(e) => this.inputValue('start_number', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>截止数：</Col>
                            <Col span={18}><Input placeholder="请输入截止数" value={this.state.end_number} onChange={(e) => this.inputValue('end_number', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>单价：</Col>
                            <Col span={18}>
                                <Input value={this.state.unit_price} onChange={(e) => this.inputValue('unit_price', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>用量：</Col>
                            <Col span={18}><Input value={this.state.consumption} onChange={(e) => this.inputValue('consumption', e)} /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>费用：</Col>
                            <Col span={18}>
                                <Input value={this.state.cost} onChange={(e) => this.inputValue('cost', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>费用类型：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} disabled={this.state.is_xiugai ? true : false} placeholder="请选择费用类型" allowClear={true} value={this.state.cost_type} onChange={this.seleCostType}>
                                    <Option value={1}>水费</Option>
                                    <Option value={2}>电费</Option>
                                    <Option value={3}>气费</Option>
                                </Select>
                            </Col>
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
                    <Col span={24} className="add-ctrl">
                        <Col span={7}>
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

export default AddPay0;

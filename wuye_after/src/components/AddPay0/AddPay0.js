import React, { Component } from 'react';
import { Row, Col, Input, Button, Select, message, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Cookies from 'js-cookie'
import moment from 'moment';
import http from '../../api/http';
const { Option } = Select;
const { MonthPicker } = DatePicker;
//css样式在home.css

class AddPay0 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            is_xiugai: false,
            image_url: [], //省份证正反index=0正，1为反
            house_number: '',
            username: '',
            start_number: '',
            end_number: '',
            unit_price: '',
            cost_type: '',
            date: '',
            pay_type: '',
            pay_status: '',
            write_people: '',
            write_time: ''
        }
    }
    componentDidMount() {
        if (this.props.location.query.id_xiu === 'true') {
            let query = this.props.location.query
            if (query.type === 1) {
                http('/payment/show', {
                    method: 'get', data: {
                        id: query.update_id,
                        cost_type: query.cost_type
                    }
                }).then(res => {
                    console.log(res)
                    this.setState({
                        is_xiugai: true,
                        house_number: res.data.house_number,
                        username: res.data.owner_name,
                        start_number: res.data.start_num,
                        end_number: res.data.end_num,
                        write_people: res.data.write_people,
                        write_time: res.data.write_time,
                        unit_price: res.data.price,
                        cost: res.data.total_price,
                        pay_status: res.data.status,
                        date: res.data.year + '-' + res.data.month,
                        consumption: res.data.end_num - res.data.start_num,
                        cost_type: res.data.type,
                        pay_type: res.data.pay_type,
                        household_id: res.data.household_id
                    })
                }).catch(res => {
                    message.error(res.msg);
                    this.setState({
                        is_xiugai: true,
                    })
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
                if (query.cost_type === 1) {
                    this.setState({
                        unit_price: res.data.water_fee,
                        cost_type: query.cost_type
                    })
                }
                if (query.cost_type === 2) {
                    this.setState({
                        unit_price: res.data.electricity_fee,
                        cost_type: query.cost_type
                    })
                }
                if (query.cost_type === 3) {
                    this.setState({
                        unit_price: res.data.gas_fee,
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
            let total = parseFloat(this.state.end_number) - parseFloat(re)
            if (re === '' || isNaN(total)) {
                this.setState({
                    start_number: re,
                    consumption: '',
                    cost: 0
                })
            } else {
                this.setState({
                    start_number: re,
                    consumption: total,
                    cost: this.state.unit_price * re
                })
            }
        }
        if (p === 'end_number') {
            let re = e.currentTarget.value.replace(/[^\d.]/, '')
            let total = parseFloat(re) - parseFloat(this.state.start_number)
            if (re === '' || isNaN(total)) {
                this.setState({
                    end_number: re,
                    consumption: '',
                    cost: 0
                })
            } else {
                this.setState({
                    end_number: re,
                    consumption: total,
                    cost: this.state.unit_price * re
                })
            }
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
        if (p === 'write_people') {
            this.setState({
                write_people: e.currentTarget.value
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
            && _thisst.date !== ''
            && _thisst.pay_type !== ''
            && _thisst.pay_status !== ''
            && _thisst.write_people !== ''
            && _thisst.write_time !== ''
        ) {
            http('/payment/create', {
                method: 'POST',
                data: {
                    start_num: _thisst.start_number,
                    end_num: _thisst.end_number,
                    household_id: _thisst.household_id,
                    date: _thisst.date,
                    type: _thisst.cost_type,
                    status: _thisst.pay_status,
                    pay_type: _thisst.pay_type,
                    write_time: _thisst.write_time,
                    write_people: _thisst.write_people,
                    price: _thisst.unit_price
                }
            }).then(res => {
                console.log(res)
                message.success(res.msg)
                this.setState({
                    start_number: '',
                    end_number: '',
                })
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    house_number: '',
                    username: '',
                })
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    writeTime = (e) => {
        this.setState({
            write_time: moment(e).format('YYYY-MM-DD HH:mm:ss')
        })
    }
    payMonth = (e) => {
        this.setState({
            date: moment(e).format('YYYY-MM')
        })
    }
    handleXiuGai = () => {
        let _thisst = this.state
        console.log(_thisst.username)
        console.log(_thisst.write_time)
        if (_thisst.house_number !== ''
            && _thisst.username !== ''
            && _thisst.start_number !== ''
            && _thisst.end_number !== ''
            && _thisst.unit_price !== ''
            && _thisst.cost_type !== ''
            && _thisst.date !== ''
            && _thisst.pay_type !== ''
            && _thisst.pay_status !== ''
            && _thisst.write_people !== ''
            && _thisst.write_time !== ''
        ) {
            http('/payment/update', {
                method: 'POST',
                data: {
                    id: this.props.location.query.update_id,
                    start_num: _thisst.start_number,
                    end_num: _thisst.end_number,
                    household_id: _thisst.household_id,
                    date: _thisst.date,
                    type: _thisst.cost_type,
                    status: _thisst.pay_status,
                    pay_type: _thisst.pay_type,
                    write_time: _thisst.write_time,
                    write_people: _thisst.write_people,
                    price: _thisst.unit_price
                }
            }).then(res => {
                message.success(res.msg);
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    blurGetHuzhu = (e) => {
        http('/household/find', {
            method: 'get',
            data: {
                community_id: Cookies.get('community_id'),
                house_number: e.currentTarget.value
            }
        }).then(res => {
            console.log(res)
            this.setState({
                username: res.data.owner_name,
                household_id: res.data.id
            })
        }).catch(res => {
            message.error(res.msg);
            this.setState({
                house_number: '',
                username: ''
            })
        })
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
                                <Input disabled={this.state.is_xiugai ? true : false} onBlur={this.blurGetHuzhu} placeholder="请输入房号" value={this.state.house_number} onChange={(e) => this.inputValue('house_number', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>户主名：</Col>
                            <Col span={18}><Input disabled placeholder="户主名" maxLength={5} value={this.state.username} onChange={(e) => this.inputValue('username', e)} /></Col>
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
                            <Col span={6}>抄表人：</Col>
                            <Col span={18}><Input value={this.state.write_people} onChange={(e) => this.inputValue('write_people', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>抄表日期：</Col>
                            <Col span={18}>
                                {
                                    this.state.is_xiugai ? <DatePicker value={moment(this.state.write_time, 'YYYY-MM-DD HH:mm:ss')} locale={locale} onChange={this.writeTime} showTime placeholder="选择抄表日期" /> :
                                        <DatePicker locale={locale} onChange={this.writeTime} showTime placeholder="选择抄表日期" />
                                }

                            </Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>单价：</Col>
                            <Col span={18}>
                                <Input style={{ background: '#f5f5f5' }} value={this.state.unit_price} onChange={(e) => this.inputValue('unit_price', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>用量：</Col>
                            <Col span={18}><Input disabled value={this.state.consumption} onChange={(e) => this.inputValue('consumption', e)} /></Col>
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
                                <Select style={{ width: '100%' }} disabled placeholder="请选择费用类型" allowClear={true} value={this.state.cost_type} onChange={this.seleCostType}>
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
                        <Col span={8} offset={1}>
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

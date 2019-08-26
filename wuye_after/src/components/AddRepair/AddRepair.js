import React, { Component } from 'react';
import { Row, Col, Input, Button, DatePicker, Select, message, TimePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import Cookies from 'js-cookie'
import 'moment/locale/zh-cn';
import http from '../../api/http';
moment.locale('zh-cn');
const { TextArea } = Input;
const { Option } = Select;
//css样式在home.css

class AddRepair extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_state: false,
            loading: false,
            is_xiugai: false,
            service_at_date: moment(),
            service_at_time: moment(),
            service_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            address:"",
            name:"",
            phone:"",
            sku_id:"",
            pay_type:1,
            remarks:"",
        }
    }
    componentDidMount() {
        if (this.props.location.query) {
            let query = this.props.location.query
            if (query.type === 1) {
                http('/repair/repairOne', {
                    method: 'POST', data: {
                        id: query.update_id
                    }
                }).then(res => {
                    console.log(res.data[0].service_at.split(' '))
                    this.setState({
                        is_xiugai: true,
                        username: res.data[0].username,
                        address: res.data[0].address,
                        service_at: res.data[0].service_at,
                        number: res.data[0].number,
                        desc: res.data[0].desc,
                        type: res.data[0].type,
                        service_at_date: res.data[0].service_at.split(' ')[0],
                        service_at_time: res.data[0].service_at.split(' ')[2]
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
    cancelAdd = () => {
        this.props.history.go(-1)
    }
    inputValue = (p, e) => {
        if (p === 'name') {
            this.setState({
                name: e.currentTarget.value
            })
        }
        if (p === 'phone') {
            let re = e.currentTarget.value.replace(/[^\d]/, '')
            this.setState({
                phone: re
            })
        }
        if (p === 'address') {
            this.setState({
                address: e.currentTarget.value
            })
        }
        if (p === 'remarks') {
            this.setState({
                remarks: e.currentTarget.value
            })
        }
    }
    inputDateValue = (e, s) => {
        this.setState(prev => ({
            service_at_date: s,
            service_time: s + ' ' + prev.service_at_time
        }))
    }
    inputTimeValue = (e, s) => {
        this.setState(prev => ({
            service_at_time: s,
            service_time: prev.service_at_date + ' ' + s
        }))
    }
    handleUpload = () => {
        let _thisst = this.state
        if (_thisst.name && _thisst.phone && _thisst.service_at_date
            && _thisst.service_at_time && _thisst.address
            && Cookies.get('community_id') && _thisst.remarks&& _thisst.pay_type) {
            http('/repair/create', {
                method: 'POST',
                data: {
                    address:_thisst.address,
                    name:_thisst.name,
                    phone:_thisst.phone,
                    sku_id:_thisst.sku_id,
                    pay_type:_thisst.pay_type,
                    remarks:_thisst.remarks,
                    service_time:_thisst.service_time,
                }
            }).then(res => {
                message.success(res.msg)
                this.setState({
                    address: '',
                    name: '',
                    service_time: '',
                    phone: '',
                    remarks: ''
                })
                setTimeout(() => {
                    this.props.history.go(-1)
                }, 2000)
            }).catch(res => {
                message.error(res.msg);
                this.setState({
                    username: '',
                    address: '',
                    service_at: '',
                    number: '',
                    desc: ''
                })
            })
        } else {
            message.error('输入不能为空，请检查！');
        }
    }
    handleXiuGai = () => {
//         let _thisst = this.state
//         if (_thisst.username && _thisst.address && _thisst.service_at_date
//             && _thisst.service_at_time && _thisst.number
//             && Cookies.get('community_id') && _thisst.desc&& _thisst.sku_id
//             ) {
//             http('/repair/create', {
//                 method: 'POST',
//                 data: {
//                     address:_thisst.address,
// name:_thisst.name,
// phone:_thisst.phone,
// sku_id:_thisst.sku_id,
// pay_type:_thisst.pay_type,
// remarks:_thisst.remarks,
// service_time:_thisst.service_time,
//                 }
//             }).then(res => {
//                 message.success(res.msg);
//                 setTimeout(() => {
//                     this.props.history.go(-1)
//                 }, 2000)
//             }).catch(res => {
//                 message.error(res.msg);
//                 this.setState({
//                     title: '',
//                     content: ''
//                 })
//             })
//         } else {
//             message.error('输入不能为空，请检查！');
//         }
    }
    seleClassId=(e)=>{
        this.setState({
            class_id:e
        })
        http('/repair/get_repair', {
            method: 'get',
            data: {
                class_id:e
            }
        }).then(res => {
            if(res.data.length>=0){
                this.setState({
                 sku_list:res.data,
                 sku_id:res.data[0].sku[0].id
                })
            }
        }).catch(res => {
            message.error(res.msg);
        })
    }
    selePayType=(e)=>{
            this.setState({
                pay_type: e,
            })
    }
    seleSku=(e)=>{
this.setState({
    sku_id:e
})
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="add">
                <Col span={24} className="add-it">
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>服务类别：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} allowClear={true} value={this.state.class_id} onChange={this.seleClassId}>
                                    <Option value={3}>公共维修</Option>
                                    <Option value={4}>房屋维修</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>服务项目：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} allowClear={true} value={this.state.sku_id} onChange={this.seleSku}>
                                    {
                                        this.state.sku_list&&this.state.sku_list.map((item,inx)=>{
                                            return (
                                                <Option key={item.sku[0].id} value={item.sku[0].id}>{item.sku[0].sku_name}</Option>)
                                        })
                                    }
                                </Select>
                            </Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>服务对象：</Col>
                            <Col span={18}>
                                 <Input placeholder='请输入服务对象名' value={this.state.name} onChange={(e) => this.inputValue('name', e)} />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>电话号码：</Col>
                            <Col span={18}>
                                 <Input placeholder='请输入服务对象电话号码' value={this.state.phone} onChange={(e) => this.inputValue('phone', e)} />
                            </Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>服务时间：</Col>
                            <Col span={18}>
                                <Col span={12}>
                                    <DatePicker locale={locale} className='add-picker' onChange={this.inputDateValue} value={moment(this.state.service_at_date, 'YYYY-MM-DD')} placeholder='请选择服务时间' />
                                </Col>
                                <Col span={12} >
                                    <TimePicker style={{ float: "right" }} onChange={this.inputTimeValue} value={moment(this.state.service_at_time, 'HH:mm:ss')} />
                                </Col>
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>服务地址：</Col>
                            <Col span={18}><Input value={this.state.address} onChange={(e) => this.inputValue('address', e)} placeholder="请输入服务地址" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>支付方式：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} placeholder="请选择支付方式" allowClear={true} value={this.state.pay_type} onChange={this.selePayType}>
                                    <Option value={1}>微信支付</Option>
                                    <Option value={2}>现金</Option>
                                    <Option value={3}>支付宝</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                          
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={2}>问题描述：</Col>
                        <Col span={15}>
                            {/* <Input placeholder="请输入50字以内问题描述" /> */}
                            <TextArea
                                placeholder="请输入50字以内问题描述"
                                autosize={{ minRows: 6, maxRows: 6 }}
                                value={this.state.remarks}
                                onChange={(e) => this.inputValue('remarks', e)}
                            />
                        </Col>
                    </Col>
                    <Col span={24} className="add-ctrl">
                        <Col span={7}>
                            <Col span={19} offset={5}>
                                <Col span={11} className="add-ctrl-it" ><Button onClick={this.cancelAdd}>取消</Button></Col>
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

export default AddRepair;

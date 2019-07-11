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
            image_url: [], //省份证正反index=0正，1为反
            service_type_list: [
                { id: 1, name: "加载中..." }
            ],
            service_at_date: moment(),
            service_at_time: moment(),
            username: '',
            address: '',
            service_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            number: '',
            desc: '',
            type: ''
        }
    }
    componentDidMount() {
        http('/service/get', { method: 'POST', data: {} }).then(res => {
            this.setState({
                service_type_list: res.data,
                type:res.data[0].id
            })
        })
        if (this.props.location.query) {
            let query = this.props.location.query
            if (query.type === 1) {
                http('/repair/repairOne', {
                    method: 'POST', data: {
                        id: query.update_id
                    }
                }).then(res => {
                    this.setState({
                        is_xiugai: true,
                        username: res.data[0].username,
                        address: res.data[0].address,
                        service_at: res.data[0].service_at,
                        number: res.data[0].number,
                        desc: res.data[0].desc,
                        type: res.data[0].type,
                        service_at_date: res.data[0].service_at.split(' ')[0],
                        service_at_time: res.data[0].service_at.split(' ')[1]
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
        if (p === 'username') {
            this.setState({
                username: e.currentTarget.value
            })
        }
        if (p === 'number') {
            let re = e.currentTarget.value.replace(/[^\d]/, '')
            this.setState({
                number: re
            })
        }
        if (p === 'address') {
            this.setState({
                address: e.currentTarget.value
            })
        }
        if (p === 'desc') {
            this.setState({
                desc: e.currentTarget.value
            })
        }
    }
    seleServerType = (e) => {
        this.setState({
            type: e
        })
    }
    inputDateValue = (e, s) => {
        this.setState(prev => ({
            service_at_date: s,
            service_at: s + ' ' + prev.service_at_time
        }))
    }
    inputTimeValue = (e, s) => {
        this.setState(prev => ({
            service_at_time: s,
            service_at: prev.service_at_date + ' ' + s
        }))
    }
    handleUpload = () => {
        let _thisst = this.state
        if (_thisst.username && _thisst.address && _thisst.service_at_date
            && _thisst.service_at_time && _thisst.number
            && Cookies.get('community_id') && _thisst.desc
            && _thisst.type !== '' && _thisst.number.search(/[\d]/) !== -1) {
            http('/repair/repairSave', {
                method: 'POST',
                data: {
                    username: _thisst.username,
                    address: _thisst.address,
                    service_at: _thisst.service_at,
                    number: _thisst.number,
                    community_id: Cookies.get('community_id'),
                    desc: _thisst.desc,
                    type: _thisst.type
                }
            }).then(res => {
                message.success(res.msg)
                this.setState({
                    username: '',
                    address: '',
                    service_at: '',
                    number: '',
                    desc: ''
                })
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
    handleXiuGai=()=>{
        let _thisst = this.state
        if(_thisst.username && _thisst.address && _thisst.service_at_date
            && _thisst.service_at_time && _thisst.number
            && Cookies.get('community_id') && _thisst.desc
            && _thisst.type !== '' && (_thisst.number.toString()).search(/[\d]/) !== -1){
            http('/repair/repairUpd',{
                method:'POST',
                data:{
                    id:this.props.location.query.update_id,
                    username:_thisst.username ,
                    address: _thisst.address,
                    service_at:_thisst.service_at,
                    number: _thisst.number,
                    desc:_thisst.desc,
                    type:_thisst.type,
                    community_id:Cookies.get('community_id'),
                }
            }).then(res=>{
                message.success(res.msg);
                setTimeout(()=>{
                    this.props.history.go(-1)
                },2000)
            }).catch(res=>{
                message.error(res.msg);
                this.setState({
                    title:'',
                    content:''
                })
            })
        }else{
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
                            <Col span={6}>服务人员：</Col>
                            <Col span={18}>
                                <Input value={this.state.username} maxLength={6} onChange={(e) => this.inputValue('username', e)} placeholder="请输入订单服务人员姓名" />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>服务数量：</Col>
                            <Col span={18}><Input value={this.state.number} onChange={(e) => this.inputValue('number', e)} placeholder="请输入服务数量" /></Col>
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
                            <Col span={6}>服务类型：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }}value={this.state.type} placeholder="请选择服务类型" allowClear={true} onChange={this.seleServerType}>
                                    {
                                        this.state.service_type_list.map((item, inx) => {
                                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                                        })
                                    }
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
                                value={this.state.desc}
                                onChange={(e) => this.inputValue('desc', e)}
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

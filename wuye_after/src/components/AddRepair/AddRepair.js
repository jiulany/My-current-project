import React, { Component } from 'react';
import { Row, Col, Input, Button, DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
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
            image_url: [], //省份证正反index=0正，1为反
            service_type_list: [
                { id: 1, name: "加载中..." }
            ],
            username: '',
            address: '',
            service_at: '',
            number: '',
            community_id: '',
            desc: '',
            type: ''
        }
    }
    componentWillMount() {
        http('/service/get', { method: 'POST', data: {} }).then(res => {
            this.setState({
                service_type_list: res.data
            })
        })
    }
    componentDidMount() {
    }
    cancelAdd = () => {
        this.props.history.go(-1)
    }
    inputValue = (p, e) => {
        console.log(p,e.currentTarget.value)
        if (p === 'username') {
            this.setState({
                username: e.currentTarget.value
            })
        }
        if (p === 'number') {
            this.setState({
                number: e.currentTarget.value
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
    inputDateValue = (e, s) => {
        console.log(e,s)
        this.setState({
            service_at: s
        })
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
                                <Input value={this.state.username} onChange={(e) => this.inputValue('username', e)} placeholder="请输入订单服务人员姓名" />
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
                                <DatePicker locale={locale} className='add-picker' onChange={this.inputDateValue} defaultValue={moment(moment(), 'YYYY/MM/DD')} format='YYYY/MM/DD' placeholder='请选择服务时间' />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>服务地址：</Col>
                            <Col span={18}><Input value={this.state.address}onChange={(e) => this.inputValue('address', e)} placeholder="请输入服务地址" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>服务类型：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} placeholder="请选择服务类型" allowClear={true} onChange={this.seleState}>
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
                                <Col span={11} className="add-ctrl-it" onClick={this.handleUpload}><Button type="primary">提交</Button></Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

export default AddRepair;

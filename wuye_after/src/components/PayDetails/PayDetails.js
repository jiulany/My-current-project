import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import http from '../../api/http';
import './PayDetails.css'
//css样式在home.css

class PayDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        let query = this.props.location.query
        if (query.type === 1) {
            http('/payment/info', {
                method: 'get', data: {
                    household_id: query.household_id,
                    type: query.cost_type
                }
            }).then(res => {
                console.log(res)
                let list = res.data
                for (let i in list) {
                    if (list[i].pay_type === 0) {
                        list[i].pay_type_ct = '未付款'
                    }
                    if (list[i].pay_type === 1) {
                        list[i].pay_type_ct = '微信'
                    }
                    if (list[i].pay_type === 2) {
                        list[i].pay_type_ct = '支付宝'
                    }
                    if (list[i].pay_type === 3) {
                        list[i].pay_type_ct = '现金'
                    }
                    if (list[i].pay_type === 4) {
                        list[i].pay_type_ct = '在线支付(银行卡支付)'
                    }
                }
                let listf = list
                let latest={}
                if(list.length>1){
                latest=listf.shift()
                }else{
                    listf=[]
                }
                this.setState({
                    list: list,
                    latest:latest,
                    listf: listf
                })
            }).catch(res => {
                message.error(res.msg);
            })
        }
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="paydetails">
                <Col span={24} className="paydetails-line">
                    <Col span={2} className='paydetails-rec'>最后记录</Col>
                    {/* <Col span={22} className='paydetails-m'>计费周期：2019.6.1-2019.6.30</Col> */}
                </Col>
                <Col span={24}>
                    <Col span={24} className='paydetails-head'>
                        <Col className='paydetails-headbg'></Col>
                        <Col className='paydetails-headit'>房号</Col>
                        <Col className='paydetails-headit'>户主号</Col>
                        <Col className='paydetails-headit'>费用(元)</Col>
                        <Col className='paydetails-headit'>付费状态</Col>
                        <Col className='paydetails-headit'>付费日期</Col>
                        <Col className='paydetails-headit'>支付方式</Col>
                        <Col className='paydetails-headit'>抄表日期</Col>
                        <Col className='paydetails-headit'>抄表人</Col>
                    </Col>
                    <Col span={24} className='paydetails-head-it'>
                        <Col className='paydetails-headit-it'>{this.state.latest && this.state.latest.house_number}</Col>
                        <Col className='paydetails-headit-it'>{this.state.latest && this.state.latest.owner_name}</Col>
                        <Col className='paydetails-headit-it'>{this.state.latest && this.state.latest.total_price}(元)</Col>
                        <Col className='paydetails-headit-it'>{this.state.latest && this.state.latest.status === 0 ? '未支付' : '已支付'}</Col>
                        <Col className='paydetails-headit-it'>{this.state.latest && this.state.latest.pay_time}</Col>
                        <Col className='paydetails-headit-it'>{this.state.latest && this.state.latest.pay_type_ct}</Col>
                        <Col className='paydetails-headit-it'>{this.state.latest && this.state.latest.write_time}</Col>
                        <Col className='paydetails-headit-it'>{this.state.latest && this.state.latest.write_people}</Col>
                    </Col>
                </Col>
                <Col span={24} className="paydetails-line-0">
                    <Col span={2} className='paydetails-rec'>历史记录</Col>
                    {/* <Col span={22} className='paydetails-m'>计费周期：2019.6.1-2019.6.30</Col> */}
                </Col>
                <Col span={24}>
                    <Col span={24} className='paydetails-head'>
                        <Col className='paydetails-headbg'></Col>
                        <Col className='paydetails-headit'>房号</Col>
                        <Col className='paydetails-headit'>户主号</Col>
                        <Col className='paydetails-headit'>费用(元)</Col>
                        <Col className='paydetails-headit'>付费状态</Col>
                        <Col className='paydetails-headit'>付费日期</Col>
                        <Col className='paydetails-headit'>支付方式</Col>
                        <Col className='paydetails-headit'>抄表日期</Col>
                        <Col className='paydetails-headit'>抄表人</Col>
                    </Col>
                    {
                        this.state.listf&&this.state.listf.map((item, inx) => {
                            return (
                                <Col span={24} className='paydetails-head-it' key={item.id}>
                                    <Col className='paydetails-headit-it'>{item.house_number}</Col>
                                    <Col className='paydetails-headit-it'>{item.owner_name}</Col>
                                    <Col className='paydetails-headit-it'>{item.total_price}(元)</Col>
                                    <Col className='paydetails-headit-it'>{item.status === 0 ? '未支付' : '已支付'}</Col>
                                    <Col className='paydetails-headit-it'>{item.pay_time}</Col>
                                    <Col className='paydetails-headit-it'>{item.pay_type_ct}</Col>
                                    <Col className='paydetails-headit-it'>{item.write_time}</Col>
                                    <Col className='paydetails-headit-it'>{item.write_people}</Col>
                                </Col>
                            )
                        })
                    }
                </Col>
            </Row>
        )
    }
}

export default PayDetails;

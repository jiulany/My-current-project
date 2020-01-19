import React, { Component } from 'react';
import { Row, Col,Input} from 'antd';//, message 
// import http from '../../api/http';
import './GoodsPayDetailsHsty.css'
const { Search } = Input;
//css样式在home.css

class GoodsPayDetailsHsty extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        // let query = this.props.location.query
        // if (query.type === 1) {
        //     http('/payment/info', {
        //         method: 'get', data: {
        //             household_id: query.household_id,
        //             type: query.cost_type
        //         }
        //     }).then(res => {
        //         let list = res.data
        //         for (let i in list) {
        //             if (list[i].pay_type === 0) {
        //                 list[i].pay_type_ct = '未付款'
        //             }
        //             if (list[i].pay_type === 1) {
        //                 list[i].pay_type_ct = '微信'
        //             }
        //             if (list[i].pay_type === 2) {
        //                 list[i].pay_type_ct = '支付宝'
        //             }
        //             if (list[i].pay_type === 3) {
        //                 list[i].pay_type_ct = '现金'
        //             }
        //             if (list[i].pay_type === 4) {
        //                 list[i].pay_type_ct = '在线支付(银行卡支付)'
        //             }
        //         }
        //         let listf = list
        //         let latest={}
        //         if(list.length>1){
        //         latest=listf.shift()
        //         }else{
        //             listf=[]
        //         }
        //         this.setState({
        //             list: list,
        //             latest:latest,
        //             listf: listf
        //         })
        //     }).catch(res => {
        //         message.error(res.msg);
        //     })
        // }
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className="gdshistory">
                <Col span={24} className="gdshistory-hd">
                    <Search placeholder='搜索：订单号' title={this.state.inp_ziduan} className="table-list-search" onSearch={this.searchTb} enterButton />
                </Col>
                <Col span={24} className="gdshistory-line">
                    <Col span={2} className='gdshistory-rec'>最后记录</Col>
                    {/* <Col span={22} className='gdshistory-m'>计费周期：2019.6.1-2019.6.30</Col> */}
                </Col>
                <Col span={24}>
                    <Col span={24} className='gdshistory-head'>
                        <Col className='gdshistory-headbg'></Col>
                        <Col className='gdshistory-headit'>订单号</Col>
                        <Col className='gdshistory-headit'>收货人信息</Col>
                        <Col className='gdshistory-headit'>商品名称</Col>
                        <Col className='gdshistory-headit'>数量</Col>
                        <Col className='gdshistory-headit'>价格</Col>
                        <Col className='gdshistory-headit'>支付方式</Col>
                        <Col className='gdshistory-headit'>下单时间</Col>
                        <Col className='gdshistory-headit'>配送人电话</Col>
                        <Col className='gdshistory-headit'>配送地址</Col>
                        <Col className='gdshistory-headit'>订单状态</Col>
                    </Col>
                    <Col span={24} className='gdshistory-head-it'>
                        {/* <Col className='gdshistory-headit-it'>{this.state.latest && this.state.latest.house_number}</Col>
                        <Col className='gdshistory-headit-it'>{this.state.latest && this.state.latest.owner_name}</Col>
                        <Col className='gdshistory-headit-it'>{this.state.latest && this.state.latest.total_price+'(元)'}</Col>
        <Col className='gdshistory-headit-it'>{this.state.latest&&this.state.latest.status === 0 &&  '未支付' }{this.state.latest&&this.state.latest.status === 1 &&  '已支付'}</Col>
                        <Col className='gdshistory-headit-it'>{this.state.latest && this.state.latest.pay_time}</Col>
                        <Col className='gdshistory-headit-it'>{this.state.latest && this.state.latest.pay_type_ct}</Col>
                        <Col className='gdshistory-headit-it'>{this.state.latest && this.state.latest.write_time}</Col>
                        <Col className='gdshistory-headit-it'>{this.state.latest && this.state.latest.write_people}</Col> */}
                    </Col>
                </Col>
                <Col span={24} className="gdshistory-line-0">
                    <Col span={2} className='gdshistory-rec'>历史记录</Col>
                    {/* <Col span={22} className='gdshistory-m'>计费周期：2019.6.1-2019.6.30</Col> */}
                </Col>
                <Col span={24}>
                    <Col span={24} className='gdshistory-head'>
                        <Col className='gdshistory-headbg'></Col>
                        <Col className='gdshistory-headit'>订单号</Col>
                        <Col className='gdshistory-headit'>收货人信息</Col>
                        <Col className='gdshistory-headit'>商品名称</Col>
                        <Col className='gdshistory-headit'>数量</Col>
                        <Col className='gdshistory-headit'>价格</Col>
                        <Col className='gdshistory-headit'>支付方式</Col>
                        <Col className='gdshistory-headit'>下单时间</Col>
                        <Col className='gdshistory-headit'>配送人电话</Col>
                        <Col className='gdshistory-headit'>配送地址</Col>
                        <Col className='gdshistory-headit'>订单状态</Col>
                    </Col>
                    {
                        this.state.listf&&this.state.listf.map((item, inx) => {
                            return (
                                <Col span={24} className='gdshistory-head-it' key={item.id}>
                                    {/* <Col className='gdshistory-headit-it'>{item.house_number}</Col>
                                    <Col className='gdshistory-headit-it'>{item.owner_name}</Col>
                                    <Col className='gdshistory-headit-it'>{item.total_price+'(元)'}</Col>
                                    <Col className='gdshistory-headit-it'>{item.status === 0 && '未支付'}{item.status ===1 && '已支付'}</Col>
                                    <Col className='gdshistory-headit-it'>{item.pay_time}</Col>
                                    <Col className='gdshistory-headit-it'>{item.pay_type_ct}</Col>
                                    <Col className='gdshistory-headit-it'>{item.write_time}</Col>
                                    <Col className='gdshistory-headit-it'>{item.write_people}</Col> */}
                                </Col>
                            )
                        })
                    }
                </Col>
            </Row>
        )
    }
}

export default GoodsPayDetailsHsty;

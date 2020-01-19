import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
// import http from '../../api/http';
import './GoodsPayDetails.css'
const { Search } = Input;
//css样式在home.css

class GoodsPayDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    toPayGoodsOrderDetails=()=>{
        this.props.history.push({ pathname: '/index/goods_paydetails/history'})
    }
    componentDidMount() {
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row>
                <Col span={24} className="gdsdtl-hd">
                    <Search placeholder='搜索：订单号' title={this.state.inp_ziduan} className="table-list-search" onSearch={this.searchTb} enterButton />
                    <Button className="gdsdtl-hd-hst" type="primary" shape="round" onClick={this.toPayGoodsOrderDetails}>
                        历史订单
                    </Button>
                </Col>
                <Col span={24} className="table-list-fenline"></Col>
                <Col span={24} className="gdsdtl-body">
                    <table className='gdsdtl-tb'>
                        <thead>
                            <tr>
                                <th colSpan="3">订单信息</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>订单号：123443558</td>
                                <td>收货人姓名：张三</td>
                                <td>收货人电话：18738291827</td>
                            </tr>
                            <tr>
                                <td>收货人地址：成都市青羊区狮马路98号九栋905</td>
                                <td>下单日期：2019-12-21   12:12:12</td>
                                <td>订单状态：未配送</td>
                            </tr>
                            <tr>
                                <td>配送人姓名：</td>
                                <td>配送人电话：</td>
                                <td>配送时间：</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
                <Col span={24} className="gdsdtl-body">
                    <table className='gdsdtl-tb'>
                        <thead>
                            <tr>
                                <th>商品名称</th>
                                <th>商品数量</th>
                                <th>价格</th>
                                <th>支付方式</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>桶装水</td>
                                <td>1</td>
                                <td>20.00￥</td>
                                <td>微信支付</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
                <Col span={24} className="gdsdtl-btn">
                        <Button  type="primary"  size='large'>
                            立刻配送
                        </Button>
                        <Button  type="primary" size='large' style={{marginLeft:'180px'}}>
                            确定
                        </Button>
                </Col>
            </Row>
        )
    }
}

export default GoodsPayDetails;

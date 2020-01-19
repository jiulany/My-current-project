import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import './ChargingManage.css'
//css样式在home.css
class ChargingManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            issle_pay: 1,
            list: ["s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s"]
        }
    }
    componentDidMount() {
    }
    toTableList=()=>{
        this.props.history.push('/index/charging_list')
    }
    render() {
        // 在父 route 中，被匹配的子 route 变成 props
        return (
            <Row className='chrg-mag'>
                <Col span={24} className="table-list-mainctrl">
                    <Col span={4}>
                        {/* <Search placeholder={this.state.inp_ziduan} title={this.state.inp_ziduan} className="table-list-search" onSearch={this.searchTb} enterButton />
                        <br /> */}
                    </Col>
                    <Col span={17}>
                        <Col span={24} className='table-list-ms'>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6} className='table-list-payst'>
                                <Col span={5} className='table-list-payed'><div className={this.state.issle_pay === 1 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>闲置</div><span></span></Col>
                                <Col span={5} className='table-list-payno'><div className={this.state.issle_pay === 2 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>充满</div><span></span></Col>
                                <Col span={5} className='table-list-payno'><div className={this.state.issle_pay === 3 ? 'table-list-paystzz-ac' : 'table-list-paystzz'}>使用中</div><span></span></Col>
                            </Col>
                        </Col>
                    </Col>
                    <Col span={3} className="table-list-add">
                        <Button type="primary" shape="round" onClick={this.addItme} className="table-list-addbtn">
                            添加
                        </Button>
                    </Col>
                </Col>
                <Col spna={24}>
                    <table className="table-list">
                        <thead>
                            <tr>
                                <th>插座编号</th>
                                <th>电桩</th>
                                <th>用户姓名</th>
                                <th>用户电话</th>
                                <th>日期</th>
                                <th>充电时长</th>
                                <th>支付金额</th>
                                <th>支付方式</th>
                                <th>插座状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >01</td>
                                <td >而我国</td>
                                <td>翁火热和</td>
                                <td>翁</td>
                                <td>为何物</td>
                                <td>发给你</td>
                                <td>二货</td>
                                <td>呵呵</td>
                                <td>而和任何</td>
                                <td style={{ width: '17%' }}>
                                    <Button type="primary" shape="round" className="table-list-xiugai" >
                                        修改
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
                <Col span={24} className="chrg-mag-bk">
                    <Col span={24} className="chrg-mag-main">
                        <Row>
                            {
                                this.state.list.map((item, inx) => {
                                    return <Col span={3} className="chrg-mag-box" key={inx}>
                                        <Col span={24} className="chrg-mag-nm">001</Col>
                                        <Col span={24} className="chrg-mag-chazuo"><img src={require('../../images/chazuo.png')} alt="" />
                                            {/* <Col span={24} className="chrg-mag-stat">
                                            <Col span={24} className="chrg-mag-stat-no"><div></div></Col>
                                            <Col span={24} className="chrg-mag-stat-gr"><div></div></Col>
                                        </Col> */}
                                            <Col span={24} className="chrg-mag-stat">
                                                <Col span={24} className="chrg-mag-stat-rd"><div></div></Col>
                                                <Col span={24} className="chrg-mag-stat-no"><div></div></Col>
                                            </Col>
                                        </Col>

                                        <Col span={24} className="chrg-mag-last">已充0.5  /  剩余2.5</Col>
                                    </Col>
                                })
                            }
                        </Row>
                    </Col>
                    <Col span={24} className="chrg-mag-left">
                        <Col span={24} className="chrg-mag-line">
                            <Col span={12} className="chrg-mag-use"><div></div>正在使用  2</Col>
                            <Col span={12} className="chrg-mag-full"><div></div>充满  1</Col>
                        </Col>
                        <Col span={24}>
                            <Col span={12} className="chrg-mag-kong"><div></div>闲置  1</Col>
                            <Col span={12} className="chrg-mag-none"><div></div>插座  156</Col>
                        </Col>
                    </Col>
                    <Col span={24} className="chrg-mag-right">
                        <Col span={24} className="chrg-mag-line">
                            <Col span={12} className="chrg-mag-use">今日充电数 3</Col>
                            <Col span={12} className="chrg-mag-full">今日收入  8</Col>
                        </Col>
                        <Col span={24}>
                            <Col span={12} className="chrg-mag-kong">今日充电总时长  20</Col>
                            <Col span={12} className="chrg-mag-none"><div className="chrg-mag-dt" onClick={this.toTableList}>详单</div></Col>
                        </Col>
                    </Col>
                </Col>
            </Row >
        )
    }
}

export default ChargingManage;

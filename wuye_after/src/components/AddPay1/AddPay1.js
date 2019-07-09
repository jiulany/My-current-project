import React, { Component } from 'react';
import { Row, Col, Input, Button, Select } from 'antd';
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
                                <Input placeholder="请输入房号" />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>户主名：</Col>
                            <Col span={18}><Input placeholder="请输入户主名" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>房屋面积：</Col>
                            <Col span={18}><Input value='120㎡' />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>单价：</Col>
                            <Col span={18}><Input placeholder="请输入截止数" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>缴费数量：</Col>
                            <Col span={18}>
                                <Input />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>费用：</Col>
                            <Col span={18}><Input placeholder="请输入费用"/></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>付费状态：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} placeholder="请选择付费状态" allowClear={true} onChange={this.seleState}>
                                    <Option value="已付费">已付费</Option>
                                    <Option value="未付费">未付费</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>支付方式 ：</Col>
                            <Col span={18}>
                                <Select style={{ width: '100%' }} placeholder="请选择支付方式" allowClear={true} onChange={this.seleState}>
                                    <Option value="微信支付">微信支付</Option>
                                    <Option value="无">无</Option>
                                </Select>
                            </Col>
                        </Col>
                    </Col>
                    <Col span={24} className="add-ctrl">
                        <Col span={7}>
                            <Col span={19} offset={5}>
                                <Col span={11} className="add-ctrl-it" ><Button>取消</Button></Col>
                                <Col span={11} className="add-ctrl-it" onClick={this.handleUpload}><Button type="primary">提交</Button></Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

export default AddPay1;

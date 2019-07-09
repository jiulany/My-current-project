import React, { Component } from 'react';
import { Row, Col, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
const { TextArea } = Input;
//css样式在home.css

class AddRepair extends Component {
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
                            <Col span={6}>订单服务人员：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入订单服务人员姓名" />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>服务数量：</Col>
                            <Col span={18}><Input placeholder="请输入服务数量" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={8}>
                            <Col span={6}>服务时间：</Col>
                            <Col span={18}>
                                <DatePicker className='add-picker' defaultValue={moment(moment(), 'YYYY/MM/DD')} format='YYYY/MM/DD' placeholder='请选择服务时间' />
                            </Col>
                        </Col>
                        <Col span={8} offset={1}>
                            <Col span={6}>服务地址：</Col>
                            <Col span={18}><Input placeholder="请输入服务地址" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={2}>问题描述：</Col>
                        <Col span={15}>
                            {/* <Input placeholder="请输入50字以内问题描述" /> */}
                            <TextArea
                                placeholder="请输入50字以内问题描述"
                                autosize={{ minRows: 6, maxRows: 6 }}
                            />
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

export default AddRepair;

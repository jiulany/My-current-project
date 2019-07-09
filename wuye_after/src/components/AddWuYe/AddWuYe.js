import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
//css样式在home.css

class AddWuYe extends Component {
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
                        <Col span={9}>
                            <Col span={6}>单元数：</Col>
                            <Col span={18}>
                                <Input placeholder="请输入单元数" />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>楼号：</Col>
                            <Col span={18}><Input placeholder="请输入楼号" /></Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={9}>
                            <Col span={6}>层数：</Col>
                            <Col span={18}><Input placeholder="请输入层数" />
                            </Col>
                        </Col>
                        <Col span={9} offset={1}>
                            <Col span={6}>单层户数：</Col>
                            <Col span={18}><Input placeholder="请输入单层户数" /></Col>
                        </Col>
                    </Col>
                    <Col span={24} className="add-ctrl">
                        <Col span={10}>
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

export default AddWuYe;

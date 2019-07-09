import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
const { TextArea } = Input;
//css样式在home.css

class AddNotice extends Component {
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
                    <Col span={2}>标题：</Col>
                        <Col span={15}>
                            {/* <Input placeholder="请输入50字以内问题描述" /> */}
                            <Input
                                placeholder="请输入标题"
                            />
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={2}>内容：</Col>
                        <Col span={15}>
                            {/* <Input placeholder="请输入50字以内问题描述" /> */}
                            <TextArea
                                placeholder="请输入您发布的内容"
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

export default AddNotice;
